import ConfigContext from "@/contexts/config/ConfigContext";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";
import { useSignalR } from "../shared-hooks/useSignalR";
import { useWebApi } from "../shared-hooks/useWebApi";

export const useMessaging = () => {
	const { httpGetAsync, httpPutAsync, httpPatchAsync } = useWebApi();
	// const auth = useContext(AuthContext);
	const config = useContext(ConfigContext);
	// const { token } = auth;
	// const { operator, clearListLoading } = auth;
	// const { operator } = auth;
	// const unreadMessages = useContext(UnreadMessagesContext);
	// const { clearListLoading } = unreadMessages;


	// const loader = useInfiniteLoader({
	// 	url: "v1/my/messages",
	// 	bearer: token,
	// 	initialFetchSize: 50,
	// });



	// const handleGotoJob = useCallback(
	// 	(payload) => {
	// 		console.log("handleGotoJob", payload);
	// 		const jobId = payload?.jobID || payload?.JobID;
	// 		const orderId = payload?.id || payload?.ID;

	// 		handlePopoverClose();
	// 		if (jobId) {
	// 			// 兩種名稱分別來自 AppPushMessage 及 MessagingResult
	// 			const deptId = payload?.DeptID ?? payload?.deptID;
	// 			const deptName = payload?.AbbrName ?? payload?.deptName;

	// 			if (auth.operator?.CurDeptID !== deptId) {
	// 				toastEx.error(`此作業屬於 ${deptName}，請切換門市後再進行操作`);
	// 				return;
	// 			}

	// 			selectJobById(jobId, {
	// 				...(orderId && {
	// 					target: orderId,
	// 				}),
	// 			});
	// 		}
	// 	},
	// 	[auth.operator?.CurDeptID, handlePopoverClose, selectJobById]
	// );

	const handlNotify = useCallback(
		(payload) => {
			console.log(`"notify" signal received`, payload);
			// const msg = `${payload.msgBody}\n - ${payload.sendName}`;
			// toast(msg, {
			// 	type: Messaging.asToastifyType(payload.type),
			// 	onClick: () => handleGotoJob(payload),
			// });

			// loadUnreadCount();
			// clearListLoading();
		},
		[]
	);

	const handleRefresh = useCallback(() => {
		console.log(`"refresh" signal received`);
		//
		// loadUnreadCount();
		// clearListLoading();
	}, []);

	const handleConnected = useCallback(() => {
		console.log(`"connected" signal received`);
		// loadUnreadCount();
		// clearListLoading();
	}, []);

	const onReconnected = useCallback(() => {
		console.log(`"reconnected" signal received`);
		// loadUnreadCount();
		// clearListLoading();
	}, []);

	const onClose = useCallback(() => { }, []);

	const { connection, connectionId, connectionState, connect, disconnect } =
		useSignalR({
			// url: import.meta.env.VITE_URL_MSG_HUB,
			url: config.MSG_HUB_URL,
			autoConnect: false,
			onConnected: handleConnected,
			onReconnected: onReconnected,
			onClose: onClose,
		});

	useEffect(() => {
		if (connection) {
			connect();
		}
		return () => {
			disconnect();
		};
	}, [connect, connection, disconnect]);

	// const markAsRead = useCallback(
	// 	async (msgId, reload = false) => {
	// 		console.log(`markAsRead`, msgId);
	// 		try {
	// 			const { status, error } = await httpPatchAsync({
	// 				bearer: token,
	// 				url: "v1/my/messages/read",
	// 				data: {
	// 					MsgID: msgId,
	// 				},
	// 			});
	// 			if (status.success) {
	// 				loadUnreadCount();
	// 				clearListLoading();
	// 				if (reload) {
	// 					loader.loadList({
	// 						refresh: true,
	// 						supressLoading: true,
	// 					});
	// 				}
	// 			} else {
	// 				throw error || new Error("為預期例外");
	// 			}
	// 		} catch (err) {
	// 			toastEx.error("標示已讀失敗", err);
	// 		}
	// 	},
	// 	[clearListLoading, httpPatchAsync, loadUnreadCount, loader, token]
	// );

	useEffect(() => {
		// notify
		connection?.on("notify", handlNotify);

		// refresh
		connection?.on("refresh", handleRefresh);

		console.log("notify handlers registered");

		return () => {
			// notify
			connection?.off("notify");

			// refresh
			connection?.off("refresh");

			console.log("notify handlers un-registered");
		};
	}, [connection, handlNotify, handleRefresh]);

	// moves to useAuth
	// useChangeTracking(() => {
	// 	const handleRegister = async () => {
	// 		console.log(`connected, registering connection ${connectionId} for ${operator?.LoginName}(${operator?.LogKey})`);
	// 		const { status } = await httpPutAsync({
	// 			url: "v1/auth/register",
	// 			bearer: token,
	// 			data: {
	// 				connectionId,
	// 			},
	// 		});
	// 		if (status.success) {
	// 			console.log(
	// 				`registeration finished.`
	// 			);
	// 		}
	// 	};
	// 	if (connectionId && operator?.LogKey) {
	// 		handleRegister();
	// 	}
	// }, [connectionId, operator?.LogKey, token]);

	return {
		connectionId,
		connectionState,
		connection,
		// ...loader,
		// ...unreadState,
		// loadUnreadCount,
		// ...popover,
		// markAsRead,
		// handleGotoJob,
	};
};
