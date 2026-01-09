import { useContext } from "react";
import Copyright from "./Copyright";
import { AppContext } from "@/contexts/app/AppContext";
import { useInit } from "@/shared-hooks/useInit";
import { useCallback } from "react";
import { toastEx } from "shared-components/toast-ex";
import { MessagingContext } from "@/contexts/messaging/MessagingContext";
import { useMemo } from "react";
import { HubConnectionState } from "@microsoft/signalr";
import useVersionCheck from "@/shared-hooks/useVersionCheck";
import PropTypes from "prop-types";
import { useMediaQuery } from "@mui/material";

export const CopyrightContainer = (props) => {
	const { autoPrompt = true, ...rest } = props;
	const { version, apiVersion, loadAppInfo, loading, profile } = useContext(AppContext);
	const messaging = useContext(MessagingContext);
	const { connectionState } = messaging;
	// const { newVersion } = useVersionCheck({
	// 	autoPrompt: autoPrompt
	// });

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
				return profile || "V";
			case HubConnectionState.Connecting:
				return "...";
			case HubConnectionState.Disconnected:
			default:
				return "X";
		}
	}, [connectionState, profile])

	useInit(() => {
		loadAppInfo();
	}, []);

	const mdOrUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

	return (
		<Copyright
			loading={loading}
			version={version}
			apiVersion={apiVersion}
			// newVersion={newVersion}
			handleCopyVersion={handleCopyVersion}
			handleCopyApiVersion={handleCopyApiVersion}
			connState={connState}
			mdOrUp={mdOrUp}
			{...rest}
		/>
	);
};

CopyrightContainer.propTypes = {
	autoPrompt: PropTypes.bool
}