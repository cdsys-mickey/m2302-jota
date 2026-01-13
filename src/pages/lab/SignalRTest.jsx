import { ConfigContext } from "shared-components/config";
// import consoleEx from "@/helpers/consoleEx";
// import { toastEx } from "@/shared-components";
import { useSignalR } from "@/shared-hooks/useSignalR";

import { memo, useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toastEx } from "shared-components/toast-ex";
import { useRunOnce } from "@/shared-hooks/useRunOnce";


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

	const receivedHandler = useCallback(async (payload) => {
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

		const registration = await navigator.serviceWorker.ready;
		registration.showNotification('Web Push 測試', {
			body: message,
			icon: '/logo192.png'
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

	useRunOnce(async () => {
		const permission = await Notification.requestPermission();
		if (permission === 'granted') {
			toastEx.info('Web Push 已允許');
		} else {
			toastEx.error("您已拒絕 Web Push");
		}
	})

	return (
		<>
			<div>SignalR: {connectionState},</div>
			<div>connectionId: {connection?.connectionId || "(N/A)"}</div>
			<div>Error: {error?.message || "(N/A)"}</div>
			<form onSubmit={form.handleSubmit(onSendSubmit)}>
				<input type="text" {...register("connectionId")} style={{ minWidth: "20em" }} />
				<br />
				<input type="text" {...register("content")} style={{ minWidth: "20em" }} />

				<input type="submit" value="Send & Web Push" />
				<input
					type="button"
					value="Broadcast & Web Push"
					onClick={form.handleSubmit(onBroadcastSubmit)}
				/>
			</form>
		</>
	);
});

SignalRTest.propTypes = {};

SignalRTest.displayName = "SignalRTest";
export default SignalRTest;
