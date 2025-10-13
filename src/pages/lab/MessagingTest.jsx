import toastEx from "@/shared-components/ToastEx/toastEx";
import { useSignalR } from "@/shared-hooks/useSignalR";
import { memo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

const MessagingTest = memo(() => {
	const form = useForm();
	const { register } = form;

	const { connection, connectionState, error } = useSignalR({
		url: "http://localhost:5229/hubs/chat",
	});

	// const state = useMemo(() => {
	// 	if (connecting) {
	// 		return "連線中...";
	// 	}
	// 	if (stopping) {
	// 		return "離線中...";
	// 	}

	// 	if (connected === null) {
	// 		return "準備中";
	// 	}
	// 	return `${connected ? "已連線" : "離線"}`;
	// }, [connected, connecting, stopping]);

	const broadcastedHandler = useCallback((payload) => {
		console.log(`messageBrocasted`, payload);
		const { level, message } = payload;
		toastEx.info(`[${level}]${message}`);
	}, []);

	const receivedHandler = useCallback((payload) => {
		console.log(`messageBrocasted`, payload);
		const { level, message } = payload;
		toastEx.success(`[${level}]${message}`);
	}, []);

	const onSendSubmit = useCallback(
		async (payload) => {
			console.log("onSendSubmit", payload);
			const { connectionId, content } = payload;
			await connection.invoke("send", connectionId, content, "DEBUG");
		},
		[connection]
	);

	const onBroadcastSubmit = useCallback(
		async (payload) => {
			console.log("onBroadcastSubmit", payload);
			const { content } = payload;
			await connection.invoke("broadcast", content, "DEBUG");
		},
		[connection]
	);

	useEffect(() => {
		connection?.on("broadcast", broadcastedHandler);
		return () => {
			// connection?.off("broadcast", broadcastedHandler);
			connection?.off("broadcast");
		};
	}, [connection, broadcastedHandler]);

	useEffect(() => {
		connection?.on("send", receivedHandler);
		return () => {
			// connection?.off("send", receivedHandler);
			connection?.off("send");
		};
	}, [connection, receivedHandler]);

	return (
		<>
			<div>SignalR: {connectionState},</div>
			<div>connectionId: {connection?.connectionId || "(N/A)"}</div>
			<div>Error: {error?.message || "(N/A)"}</div>
			<form onSubmit={form.handleSubmit(onSendSubmit)}>
				<input type="text" {...register("connectionId")} />
				<input type="text" {...register("content")} />

				<input type="submit" value="發送" />
				<input
					type="button"
					value="廣播"
					onClick={form.handleSubmit(onBroadcastSubmit)}
				/>
			</form>
		</>
	);
});

MessagingTest.propTypes = {};

MessagingTest.displayName = "MessagingTest";
export default MessagingTest;
