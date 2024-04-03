import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useInfiniteLoader } from "../shared-hooks/useInfiniteLoader";
import { usePopover } from "../shared-hooks/usePopover";
import { useSignalR } from "../shared-hooks/useSignalR";
import { useWebApi } from "../shared-hooks/useWebApi";
import Errors from "../shared-modules/sd-errors";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";
import Messaging from "../modules/md-messaging";
import { AppFrameContext } from "../shared-contexts/app-frame/AppFrameContext";

export const useMessaging = ({ token }) => {
	const { httpGetAsync, httpPutAsync, httpPatchAsync } = useWebApi();
	const auth = useContext(AuthContext);
	const { operator, clearListLoading } = auth;
	const popover = usePopover();
	const { handlePopoverClose } = popover;
	const { selectJobById } = useContext(AppFrameContext);

	const loader = useInfiniteLoader({
		url: "v1/my/messages",
		bearer: token,
		initialFetchSize: 50,
	});

	const [unreadState, setUnreadState] = useState({
		unreadCount: 0,
		unreadCountError: null,
		unreadCountLoading: null,
	});

	const loadUnreadCount = useCallback(async () => {
		// console.log("loadUnreadCount, token", token);
		if (!token) {
			return;
		}
		setUnreadState((prev) => ({
			...prev,
			unreadCountLoading: true,
		}));
		try {
			const { status, payload, error } = await httpGetAsync({
				url: `v1/my/messages/unread-count`,
				bearer: token,
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
	}, [httpGetAsync, token]);

	const handleGotoJob = useCallback(
		(payload) => {
			console.log("handleGotoJob", payload);
			const jobId = payload?.jobID || payload?.JobID;
			const targetId = payload?.id || payload?.ID;

			handlePopoverClose();
			if (jobId) {
				selectJobById(jobId, {
					...(targetId && {
						id: targetId,
					}),
				});
			}
		},
		[handlePopoverClose, selectJobById]
	);

	const handlNotify = useCallback(
		(payload) => {
			console.log(`"notify" signal received`, payload);
			const msg = `${payload.msgBody}\n - ${payload.sendName}`;
			toast(msg, {
				type: Messaging.asToastifyType(payload.type),
				onClick: () => handleGotoJob(payload),
			});

			loadUnreadCount();
			clearListLoading();
		},
		[clearListLoading, handleGotoJob, loadUnreadCount]
	);

	const handleRefresh = useCallback(() => {
		console.log(`"refresh" signal received`);
		//
		loadUnreadCount();
		clearListLoading();
	}, [clearListLoading, loadUnreadCount]);

	const onConnected = useCallback(() => {
		loadUnreadCount();
		clearListLoading();
	}, [clearListLoading, loadUnreadCount]);

	const onReconnected = useCallback(() => {
		loadUnreadCount();
		clearListLoading();
	}, [clearListLoading, loadUnreadCount]);

	const onClose = useCallback(() => {}, []);

	const { connection, connectionId, connectionState, connect } = useSignalR({
		url: import.meta.env.VITE_URL_MSG_HUB,
		autoConnect: false,
		onConnected: onConnected,
		onReconnected: onReconnected,
		onClose: onClose,
	});

	useEffect(() => {
		if (token && connection) {
			connect();
		}
	}, [connect, connection, token]);

	const markAsRead = useCallback(
		async (msgId, reload = false) => {
			console.log(`markAsRead`, msgId);
			try {
				const { status, error } = await httpPatchAsync({
					bearer: token,
					url: "v1/my/messages/read",
					data: {
						MsgID: msgId,
					},
				});
				if (status.success) {
					loadUnreadCount();
					clearListLoading();
					if (reload) {
						loader.loadList({
							refresh: true,
							supressLoading: true,
						});
					}
				} else {
					throw error || new Error("為預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("標示已讀失敗", err));
			}
		},
		[clearListLoading, httpPatchAsync, loadUnreadCount, loader, token]
	);

	useEffect(() => {
		// notify
		// console.log("notify handler registered");
		connection?.on("notify", handlNotify);

		// refresh
		connection?.on("refresh", handleRefresh);
		// console.log("refresh handler registered");

		console.log("notify handlers registered");

		return () => {
			// notify
			connection?.off("notify");
			// console.log("notify handler un-registered");

			// refresh
			connection?.off("refresh");
			// console.log("refresh handler un-registered");

			console.log("notify handlers un-registered");
		};
	}, [connection, handlNotify, handleRefresh]);

	useEffect(() => {
		const handleConnected = async () => {
			console.log(`registering connection id: ${connectionId}`);
			const { status } = await httpPutAsync({
				url: "v1/auth/register",
				bearer: token,
				data: {
					connectionId,
				},
			});
			if (status.success) {
				console.log(
					`connectionId ${connectionId} registered for ${operator?.LogKey}`
				);
			}
		};
		if (connectionId && operator?.LogKey) {
			handleConnected();
		}
	}, [connectionId, httpPutAsync, operator?.LogKey, token]);

	return {
		connectionState,
		connection,
		...loader,
		...unreadState,
		loadUnreadCount,
		// ...recentMessagesState,
		// loadRecentMessages,
		...popover,
		markAsRead,
		handleGotoJob,
	};
};
