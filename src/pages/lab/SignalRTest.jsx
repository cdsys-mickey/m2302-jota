import { memo } from "react";
import PropTypes from "prop-types";
import { useSignalR } from "@/shared-hooks/useSignalR";
import { useMemo } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import ConfigContext from "@/contexts/config/ConfigContext";
import toastEx from "@/helpers/toastEx";
import { Rule } from "@mui/icons-material";

const SignalRTest = memo(() => {
	const form = useForm();
	const { register, setValue } = form;
	const config = useContext(ConfigContext);

	const { connection, connectionState, error } = useSignalR({
		// url: import.meta.env.VITE_URL_CHAT_HUB,
		url: config.CHAT_HUB_URL,
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
		toastEx.success(`[${level}]${message}`, {
			actionText: "取消",
			onAction: (e) => {
				toastEx.info("onAction triggered");
				e.preventDefault();
				// e.stopPropagation();
			},
			position: "top-center",
			// slotProps: {
			// 	button: {
			// 		dense: true,
			// 		color: "white"
			// 	}
			// },
			// autoClose: false
		});
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

	useEffect(() => {
		setValue("connectionId", connection?.connectionId);
	}, [connection?.connectionId, setValue]);

	return (
		<>
			<div>SignalR: {connectionState},</div>
			<div>connectionId: {connection?.connectionId || "(N/A)"}</div>
			<div>Error: {error?.message || "(N/A)"}</div>
			<form onSubmit={form.handleSubmit(onSendSubmit)}>
				<input type="text" {...register("connectionId")} style={{ minWidth: "20em" }} />
				<br />
				<input type="text" {...register("content")} style={{ minWidth: "20em" }} />

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
