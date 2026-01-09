import { AppContext } from "@/contexts/app/AppContext";
import { useCallback, useContext, useMemo } from "react";
import { toastEx } from "shared-components/toast-ex";
import { useChangeTracking } from "./useChangeTracking";

const defaultPromptMessage = (newVersion) => {
	return `偵測到新版本 ${newVersion}，請按 Ctrl+F5 強制更新`;
};

export default function useVersionCheck(opts) {
	const {
		autoPrompt = true,
		promptDelay = 500,
		promptMessage = defaultPromptMessage,
	} = opts ?? {};
	const { version, loading, frontEnd } = useContext(AppContext);
	// const dialogs = useContext(DialogsContext);

	const _promptMessage = useMemo(() => {
		if (typeof promptMessage === "function") {
			return promptMessage(frontEnd?.version);
		}
		return promptMessage;
	}, [frontEnd?.version, promptMessage]);

	const promptRefresh = useCallback(() => {
		toastEx.warn(_promptMessage, {
			position: "bottom-right",
		});
	}, [_promptMessage]);

	const isUpToDate = useMemo(() => {
		return loading == false && version >= frontEnd?.version;
	}, [frontEnd?.version, loading, version]);

	const isRefreshRequired = useMemo(() => {
		return (
			import.meta.env.VITE_PROFILE !== "dev" &&
			loading == false &&
			frontEnd?.version > version
		);
	}, [frontEnd?.version, loading, version]);

	const newVersion = useMemo(() => {
		return isRefreshRequired ? frontEnd?.version : null;
	}, [frontEnd?.version, isRefreshRequired]);

	useChangeTracking(() => {
		if (autoPrompt && isRefreshRequired) {
			setTimeout(promptRefresh, promptDelay);
		}
	}, [isRefreshRequired]);

	return {
		promptRefresh,
		isUpToDate,
		isRefreshRequired,
		newVersion,
	};
}
