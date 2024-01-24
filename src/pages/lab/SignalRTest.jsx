import { memo } from "react";
import PropTypes from "prop-types";
import { useSignalR } from "../../hooks/useSignalR";
import { useMemo } from "react";

const SignalRTest = memo(() => {
	const { hubConnection, connected, starting, stopping } = useSignalR({
		url: "http://localhost:5229/hub/chat",
	});

	const state = useMemo(() => {
		if (starting) {
			return "連線中...";
		}
		if (stopping) {
			return "離線中...";
		}

		if (connected === null) {
			return "準備中";
		}
		return `${connected ? "已連線" : "離線"}`;
	}, [connected, starting, stopping]);

	hubConnection?.on("messageReceived", (data) => {
		console.log(`messageReceived`, data);
	});

	return <div>SignalR: {state}</div>;
});

SignalRTest.propTypes = {};

SignalRTest.displayName = "SignalRTest";
export default SignalRTest;
