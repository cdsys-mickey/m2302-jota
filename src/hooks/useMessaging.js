import { ConfigContext } from "shared-components/config";
import { useCallback, useContext, useEffect } from "react";
import { useSignalR } from "@/shared-hooks/useSignalR";
import { toastEx } from "shared-components/toast-ex";

export const useMessaging = () => {
	const config = useContext(ConfigContext);

	// const handlNotify = useCallback((payload) => {
	// 	console.log(`"notify" signal received`, payload);
	// }, []);

	// const handleRefresh = useCallback(() => {
	// 	console.log(`"refresh" signal received`);
	// }, []);

	const handleConnected = useCallback(() => {
		console.log(`"connected" signal received`);
	}, []);

	const onReconnected = useCallback(() => {
		console.log(`"reconnected" signal received`);
	}, []);

	const onClose = useCallback(() => {}, []);

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

	const ensureNotificationPermission = async () => {
		// 1. 如果已經允許過了，直接回傳 true
		if (Notification.permission === "granted") {
			return true;
		}

		// 2. 如果之前被拒絕了，提醒使用者要去設定開啟
		if (Notification.permission === "denied") {
			toastEx.error("您已拒絕通知");
			return false;
		}

		// 3. 如果是 default，才跳出系統詢問視窗
		const status = await Notification.requestPermission();
		return status === "granted";
	};

	// useEffect(() => {
	// 	// notify
	// 	connection?.on("notify", handlNotify);
	// 	// refresh
	// 	connection?.on("refresh", handleRefresh);

	// 	return () => {
	// 		// notify
	// 		connection?.off("notify");
	// 		// refresh
	// 		connection?.off("refresh");
	// 	};
	// }, [connection, handlNotify, handleRefresh]);

	return {
		connectionId,
		connectionState,
		connection,
		ensureNotificationPermission,
	};
};
