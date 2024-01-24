import { useCallback, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useEffect } from "react";

export const useSignalR = ({ url, autoConnect = true, reconnect = true }) => {
	const [hubConn, setHubConn] = useState();
	const [state, setState] = useState({
		connected: null,
		starting: false,
		stopping: false,
		error: null,
	});

	const createConnection = useCallback(() => {
		const newHubConn = new signalR.HubConnectionBuilder()
			.withUrl(url)
			.configureLogging(signalR.LogLevel.Information)
			// .withAutomaticReconnect([0, 0, 10000])
			.withAutomaticReconnect()
			.build();
		setHubConn(newHubConn);
		console.log(`[SignalR] hub ${url} connection created`, newHubConn);
	}, [url]);

	useEffect(() => {
		createConnection();
	}, [createConnection]);

	useEffect(() => {
		if (autoConnect && hubConn) {
			if (hubConn.state === signalR.HubConnectionState.Disconnected) {
				console.log(`[SignalR] connecting to Hub "${url}" ...`);
				setState((prev) => ({
					...prev,
					connected: false,
					starting: true,
					error: null,
				}));
				hubConn
					.start()
					.then(() => {
						console.log(`[SignalR] Hub ${url} connected`);
						setState((prev) => ({
							...prev,
							connected: true,
							starting: false,
						}));
					})
					.catch((err) => {
						console.error(
							`[SignalR] Hub ${url} failed to connect`,
							err
						);
						setState((prev) => ({
							...prev,
							starting: false,
							error: err,
						}));
					});
			} else {
				console.log(
					`[SignalR] Hub ${url} state mistched, connect ignored:`,
					hubConn.state
				);
			}
		}

		return () => {
			if (hubConn) {
				if (hubConn.state === signalR.HubConnectionState.Connected) {
					console.log(`[SignalR] disconnecting from Hub ${url} ...`);
					setState((prev) => ({
						...prev,
						stopping: true,
						error: null,
					}));
					hubConn
						.stop()
						.then(() => {
							console.log(`[SignalR] Hub ${url} disconnected`);
							setState((prev) => ({
								...prev,
								stopping: false,
							}));
						})
						.catch((err) => {
							console.error(
								`[SignalR] Hub ${url} disconnect error`,
								err
							);
							setState((prev) => ({
								...prev,
								stopping: false,
								error: err,
							}));
						});
				} else {
					console.log(
						`[SignalR] Hub ${url} state mismatched, disconnect ignored:`,
						hubConn.state
					);
				}
			}
		};
	}, [autoConnect, hubConn, url]);

	return {
		hubConnection: hubConn,
		...state,
	};
};
