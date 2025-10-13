import { useContext } from "react";
import Copyright from "./Copyright";
import { AppContext } from "@/contexts/app/AppContext";
import { useInit } from "@/shared-hooks/useInit";
import { useCallback } from "react";
import toastEx from "@/shared-components/ToastEx/toastEx";
import { MessagingContext } from "@/contexts/messaging/MessagingContext";
import { useMemo } from "react";
import { HubConnectionState } from "@microsoft/signalr";

export const CopyrightContainer = (props) => {
	const { ...rest } = props;
	const { version, apiVersion, loadAppInfo, loading } = useContext(AppContext);
	const messaging = useContext(MessagingContext);
	const { connectionState } = messaging;

	const handleCopyVersion = useCallback(async () => {
		await navigator.clipboard.writeText(version);
		toastEx.info("APP 版號已複製到剪貼簿")
	}, [version]);

	const handleCopyApiVersion = useCallback(async () => {
		await navigator.clipboard.writeText(apiVersion);
		toastEx.info("API 版號已複製到剪貼簿")
	}, [apiVersion]);

	const connState = useMemo(() => {
		switch (connectionState) {
			case HubConnectionState.Connected:
				return "V";
			case HubConnectionState.Connecting:
				return "...";
			case HubConnectionState.Disconnected:
			default:
				return "X";
		}
	}, [connectionState])

	useInit(() => {
		loadAppInfo();
	}, []);

	return (
		<Copyright
			loading={loading}
			version={version}
			apiVersion={apiVersion}
			handleCopyVersion={handleCopyVersion}
			handleCopyApiVersion={handleCopyApiVersion}
			connState={connState}
			{...rest}
		/>
	);
};
