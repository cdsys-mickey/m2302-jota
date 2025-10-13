import ConfigContext from "@/contexts/config/ConfigContext";
import { useCallback, useContext, useEffect } from "react";
import { useSignalR } from "@/shared-hooks/useSignalR";

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
	};
};
