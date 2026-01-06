import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";
import { useInfiniteLoader } from "../shared-hooks/useInfiniteLoader";
import { useState } from "react";
import { useCallback } from "react";
import { useWebApiAsync } from "@/shared-hooks";
import { usePopover } from "@/shared-hooks/usePopover";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useEffect } from "react";
import { MessagingContext } from "@/contexts/messaging/MessagingContext";
import { toast } from "react-toastify";
import Messaging from "@/modules/md-messaging";
import { toastEx } from "shared-components/toast-ex";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { HubConnectionState } from "@microsoft/signalr";

export const useUnreadMessages = () => {
	const auth = useContext(AuthContext);
	const messaging = useContext(MessagingContext);
	const { connection, connectionState } = messaging;
	const { httpGetAsync, httpPutAsync, httpPatchAsync } = useWebApiAsync();
	const unreadMessageListLoader = useInfiniteLoader({
		url: "v1/my/messages",
		bearer: auth.token,
		initialFetchSize: 30,
		params: {
			ur: 1,
		},
	});

	const [unreadState, setUnreadState] = useState({
		unreadCount: 0,
		unreadCountError: null,
		unreadCountLoading: null,
	});
	const popover = usePopover();
	const { handlePopoverClose } = popover;
	const { selectJobById } = useContext(AppFrameContext);

	const loadUnreadCount = useCallback(async () => {
		// console.log("loadUnreadCount, token", token);
		if (!auth.token) {
			return;
		}
		setUnreadState((prev) => ({
			...prev,
			unreadCountLoading: true,
		}));
		try {
			const { status, payload, error } = await httpGetAsync({
				url: `v1/my/messages/unread-count`,
				bearer: auth.token,
			});
			if (status.success) {
				setUnreadState((prev) => ({
					...prev,
					unreadCount: payload,
					unreadCountError: null,
				}));
			} else {
				throw error || new Error("發生未預期例外");
			}
		} catch (err) {
			setUnreadState((prev) => ({
				...prev,
				unreadCountError: err,
			}));
		} finally {
			setUnreadState((prev) => ({
				...prev,
				unreadCountLoading: false,
			}));
		}
	}, [auth.token, httpGetAsync]);

	const handleGotoJob = useCallback(
		(payload) => {
			console.log("handleGotoJob", payload);
			const jobId = payload?.jobID || payload?.JobID;
			const orderId = payload?.id || payload?.ID;

			handlePopoverClose();
			if (jobId) {
				// 兩種名稱分別來自 AppPushMessage 及 MessagingResult
				const deptId = payload?.DeptID ?? payload?.deptID;
				const deptName = payload?.AbbrName ?? payload?.deptName;

				if (auth.operator?.CurDeptID !== deptId) {
					toastEx.error(
						`此作業屬於[${deptName}]，請切換門市後再進行操作`
					);
					return;
				}

				selectJobById(jobId, {
					...(orderId && {
						target: orderId,
					}),
				});
			}
		},
		[auth.operator?.CurDeptID, handlePopoverClose, selectJobById]
	);

	const handlNotify = useCallback(
		(payload) => {
			console.log(`"notify" signal received`, payload);
			const msg = `${payload.msgBody}\n - ${payload.sendName}`;
			toastEx(msg, {
				type: Messaging.asToastifyType(payload.type),
				onClick: () => handleGotoJob(payload),
			});

			loadUnreadCount();
			unreadMessageListLoader.clearListLoading();
		},
		[handleGotoJob, loadUnreadCount, unreadMessageListLoader]
	);

	const handleRefresh = useCallback(() => {
		console.log(`"refresh" signal received`);
		//
		loadUnreadCount();
		unreadMessageListLoader.clearListLoading();
	}, [loadUnreadCount, unreadMessageListLoader]);

	useEffect(() => {
		// notify
		connection?.on("notify", handlNotify);

		return () => {
			// notify
			connection?.off("notify");
		};
	}, [connection, handlNotify, handleRefresh]);

	useEffect(() => {
		// refresh
		connection?.on("refresh", handleRefresh);

		return () => {
			// refresh
			connection?.off("refresh");
		};
	}, [connection, handlNotify, handleRefresh]);

	// const handleBroadcast = useCallback((payload) => {
	// 	const { level, message } = payload;
	// 	toastEx.info(`[${level}]${message}`);
	// }, []);

	// useEffect(() => {
	// 	connection?.on("broadcast", handleBroadcast);
	// 	return () => {
	// 		connection?.off("broadcast");
	// 	};
	// }, [connection, handleBroadcast]);

	useChangeTracking(() => {
		switch (connectionState) {
			case HubConnectionState.Connected:
				if (auth.token) {
					loadUnreadCount();
					unreadMessageListLoader.clearListLoading();
				}
				break;
		}
	}, [connectionState, auth.token]);

	return {
		...popover,
		...unreadMessageListLoader,
		...unreadState,
		loadUnreadCount,
		handleGotoJob,
	};
};
