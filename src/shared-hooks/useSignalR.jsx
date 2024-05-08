import { useCallback, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useEffect } from "react";
import { useRef } from "react";
import { useMemo } from "react";

// const reconnectDelays = [0, 0, 3000, 3000, 6000, 12000, 12000, 180000];
const DEFAULT_RECONNECT_DELAYS = [
	0, 0, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000,
	6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000,
	12000, 12000, 12000, 12000, 12000, 12000, 12000, 12000, 12000, 12000, 12000,
	60000, 60000, 60000, 60000, 60000, 60000, 60000, 60000, 60000, 60000, 60000,
	180000,
];

/**
 * 這裡的 connectionState 不是 connection.state, 雖然採用一樣的型態, 但實際上是分開維護的
 * @param {*} param0
 * @returns
 */
export const useSignalR = ({
	url,
	onClose,
	onReconnecting,
	onReconnected,
	onConnected,
	onConnectFailed,
	// nextRetryPolicy = defaultNextRetryPolicy,
	reconnectDelays = DEFAULT_RECONNECT_DELAYS, // 斷線後重新嘗試的等待時間
	retryInterval = 60000, // 交握失敗的等待時間
	autoConnect = true,
	logginLevel = signalR.LogLevel.Error,
}) => {
	const [connection, setConnection] = useState();
	const [state, setState] = useState({
		connectionState: null,
		error: null,
		// connectionId: null,
	});

	const nextRetryPolicy = useCallback(
		(retryContext) => {
			const index =
				retryContext.previousRetryCount < reconnectDelays.length
					? retryContext.previousRetryCount
					: reconnectDelays.length - 1;
			return reconnectDelays[index];
		},
		[reconnectDelays]
	);

	const createConnection = useCallback(() => {
		// console.log(`[SignalR] creating hub connection [${url}]...`);
		const builder = new signalR.HubConnectionBuilder().withUrl(url, {
			// skipNegotiation: true,
			// transport: signalR.HttpTransportType.WebSockets,
		});
		if (logginLevel) {
			builder.configureLogging(logginLevel);
		}

		if (reconnectDelays) {
			builder.withAutomaticReconnect({
				nextRetryDelayInMilliseconds: nextRetryPolicy,
			});
		}
		const newConn = builder.build();
		setConnection(newConn);
	}, [logginLevel, nextRetryPolicy, reconnectDelays, url]);

	const handleConnected = useCallback(
		({ connection } = {}) => {
			setState((prev) => ({
				...prev,
				connectionState: signalR.HubConnectionState.Connected,
				// connectionId: connection?.connectionId,
			}));
			if (onConnected) {
				onConnected({ connection });
			}
		},
		[onConnected]
	);

	const handleFailed = useCallback(
		(err) => {
			setState((prev) => ({
				...prev,
				connectionState: signalR.HubConnectionState.Disconnected,
				error: err,
			}));
			if (onConnectFailed) {
				onConnectFailed(err);
			}
		},
		[onConnectFailed]
	);

	const handleClose = useCallback(
		({ error, connection } = {}) => {
			// console.log("handleClose", err);
			setState((prev) => ({
				...prev,
				connected: false,
				error: error,
			}));
			if (onClose) {
				onClose({ error, connection });
			}
		},
		[onClose]
	);

	const handleReconnecting = useCallback(
		({ error, connection } = {}) => {
			// console.info("onReconnecting", err);
			setState((prev) => ({
				...prev,
				connectionState: signalR.HubConnectionState.Connecting,
				error: error,
			}));
			if (onReconnecting) {
				onReconnecting({ connection, error });
			}
		},
		[onReconnecting]
	);

	const handleReconnected = useCallback(
		(connectionId) => {
			// console.info("handleReconnected, new connectionId:", connectionId);
			setState((prev) => ({
				...prev,
				connectionState: signalR.HubConnectionState.Connected,
				error: null,
			}));
			if (onReconnected) {
				onReconnected(connectionId);
			}
		},
		[onReconnected]
	);

	const connect = useCallback(async () => {
		if (connection.state === signalR.HubConnectionState.Disconnected) {
			console.log(`[SignalR] connecting to Hub "${url}" ...`);
			setState((prev) => ({
				...prev,
				connectionState: signalR.HubConnectionState.Connecting,
				error: null,
			}));
			try {
				await connection.start();
				console.log(
					`[SignalR] Hub ${url} connected, connectionId: ${connection.connectionId}`,
					connection
				);
				handleConnected({ connection });
			} catch (err) {
				if (retryInterval > 0) {
					retryIntervalIdRef.current = setInterval(() => {
						if (retryIntervalIdRef.current) {
							clearInterval(retryIntervalIdRef.current);
							retryIntervalIdRef.current = null;
						}

						console.log("Retrying...");
						connect(); // re connecting....
					}, retryInterval);
				}

				console.error(
					`[SignalR] Hub ${url} failed to connect, retry in ${retryInterval} millis, retryIntervalId: ${retryIntervalIdRef.current}`,
					err
				);
				handleFailed(err);
			}
		} else {
			console.warn(
				"connection.state is not Disconnected",
				connection.state
			);
		}
	}, [connection, handleConnected, handleFailed, retryInterval, url]);

	const connectionId = useMemo(() => {
		return connection?.connectionId;
	}, [connection?.connectionId]);

	useEffect(() => {
		connection?.onclose(handleClose);
	}, [connection, handleClose]);

	useEffect(() => {
		connection?.onreconnecting(handleReconnecting);
	}, [connection, handleReconnecting]);

	useEffect(() => {
		connection?.onreconnected(handleReconnected);
	}, [connection, handleReconnected]);

	useEffect(() => {
		createConnection();
	}, [createConnection]);

	const retryIntervalIdRef = useRef();

	const disconnect = useCallback(() => {
		if (retryIntervalIdRef.current) {
			clearInterval(retryIntervalIdRef.current);
		}

		if (connection?.state === signalR.HubConnectionState.Connected) {
			console.log(`[SignalR] disconnecting from Hub ${url} ...`);
			setState((prev) => ({
				...prev,
				stopping: true,
				error: null,
			}));
			connection
				.stop()
				.then(() => {
					console.log(`[SignalR] Hub ${url} disconnected`);
					setState((prev) => ({
						...prev,
						stopping: false,
					}));
				})
				.catch((err) => {
					console.error(`[SignalR] Hub ${url} disconnect error`, err);
					setState((prev) => ({
						...prev,
						stopping: false,
						error: err,
					}));
				});
		}
	}, [connection, url]);

	useEffect(() => {
		if (autoConnect && connection) {
			connect();
		}

		return () => {
			if (autoConnect) {
				disconnect();
			}
		};
	}, [autoConnect, connect, connection, disconnect]);

	return {
		connect,
		disconnect,
		connection,
		connectionId,
		...state,
	};
};
