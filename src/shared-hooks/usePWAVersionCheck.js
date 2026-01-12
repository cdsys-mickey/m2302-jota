import { AppContext } from "@/contexts/app/AppContext";
import { useCallback, useContext, useMemo } from "react";
import { toastEx } from "shared-components/toast-ex";
import { useChangeTracking } from "./useChangeTracking";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import Cookies from "js-cookie";
import { useRunOnce } from "./useRunOnce";

const defaultPromptMessage = (newVersion) => {
	return `偵測到新版本 ${newVersion}，請按 Ctrl+F5 強制更新`;
};

export default function usePWAVersionCheck(opts) {
	const {
		autoToast = false,
		autoPrompt = false,
		autoRefresh = false,
		autoToastUpdated = false,
		triggerDelay,
		promptDelay = 500,
		toastDelay = 500,
		promptMessage = defaultPromptMessage,
	} = opts ?? {};
	const {
		version,
		loading,
		frontEnd,
		// PWA
		needRefresh,
		updateServiceWorker,
	} = useContext(AppContext);
	const dialogs = useContext(DialogsContext);

	const _promptMessage = useMemo(() => {
		if (typeof promptMessage === "function") {
			return promptMessage(frontEnd?.version);
		}
		return promptMessage;
	}, [frontEnd?.version, promptMessage]);

	const toastRefresh = useCallback(() => {
		toastEx.warn(_promptMessage, {
			position: "bottom-right",
		});
	}, [_promptMessage]);

	const promptRefresh = useCallback(() => {
		dialogs.confirm({
			message: `偵測到新版本 ${frontEnd?.version}, 按下「確定更新」即可更新\n*** 若更新後仍持續提示，請手動按 Ctrl+F5 強制重新整理`,
			confirmText: "更新",
			onConfirm: () => {
				Cookies.get("updated-version", frontEnd?.version);
				updateServiceWorker(true);
				setTimeout(() => {
					location.reload();
				}, 500);
			},
		});
	}, [dialogs, frontEnd?.version, updateServiceWorker]);

	const isUpToDate = useMemo(() => {
		return loading == false && version >= frontEnd?.version;
	}, [frontEnd?.version, loading, version]);

	const isRefreshRequired = useMemo(() => {
		return (
			needRefresh &&
			import.meta.env.VITE_PROFILE !== "dev" &&
			loading == false &&
			frontEnd?.version > version
		);
	}, [frontEnd?.version, loading, needRefresh, version]);

	const newVersion = useMemo(() => {
		return isRefreshRequired ? frontEnd?.version : null;
	}, [frontEnd?.version, isRefreshRequired]);

	useChangeTracking(() => {
		if (isRefreshRequired) {
			if (autoRefresh) {
				Cookies.set("updated-version", frontEnd?.version);
				updateServiceWorker(true);
				setTimeout(() => {
					location.reload();
				}, 500);
			} else if (autoPrompt) {
				setTimeout(promptRefresh, triggerDelay ?? promptDelay);
			} else if (autoToast) {
				setTimeout(toastRefresh, triggerDelay ?? toastDelay);
			}
		}
	}, [isRefreshRequired]);

	const toastUpdated = useCallback(() => {
		const updated = Cookies.get("updated-version");
		if (updated) {
			Cookies.remove("updated-version");
			toastEx.info(`已更新到 ${updated}`);
		}
	}, []);

	useRunOnce(() => {
		if (autoToastUpdated) {
			toastUpdated();
		}
	});

	return {
		toastRefresh,
		promptRefresh,
		isUpToDate,
		isRefreshRequired,
		newVersion,
	};
}
