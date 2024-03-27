import { memo } from "react";
import PropTypes from "prop-types";
import { useSignalR } from "@/shared-hooks/useSignalR";
import { useMemo } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

const SignalRTest = memo(() => {
	const form = useForm();
	const { register } = form;

	const { connection, connectionState, error } = useSignalR({
		url: import.meta.env.VITE_URL_CHAT_HUB,
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
		toast.info(`[${level}]${message}`);
	}, []);

	const receivedHandler = useCallback((payload) => {
		console.log(`messageBrocasted`, payload);
		const { level, message } = payload;
		toast.success(`[${level}]${message}`);
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
			connection?.off("broadcast");
		};
	}, [connection, broadcastedHandler]);

	useEffect(() => {
		connection?.on("send", receivedHandler);
		return () => {
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

SignalRTest.propTypes = {};

SignalRTest.displayName = "SignalRTest";
export default SignalRTest;
