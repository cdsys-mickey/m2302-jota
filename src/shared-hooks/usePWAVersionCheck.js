import { AppContext } from "@/contexts/app/AppContext";
import { useCallback, useContext, useMemo } from "react";
import { toastEx } from "shared-components/toast-ex";
import { useChangeTracking } from "./useChangeTracking";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import Cookies from "js-cookie";
import { useRunOnce } from "./useRunOnce";

const defaultPromptMessage = ({ newVersion, autoUpdate }) => {
	if (autoUpdate) {
		return `新版本 ${newVersion} 已下載完成, 按下「確定」套用更新`;
	}
	return `偵測到新版本 ${newVersion}，請按 Ctrl+F5 強制更新`;
};

const defaultToastMessage = ({ newVersion, autoUpdate }) => {
	if (autoUpdate) {
		return `新版本 ${newVersion} 已更新完成, 重新整理(F5)後即可繼續使用\n*** 若重新整理後後仍持續提示，請手動按 Ctrl+F5 強制重新整理`;
	}
	return `偵測到新版本 ${newVersion}，請按 Ctrl+F5 強制更新`;
};

export default function usePWAVersionCheck(opts) {
	const {
		autoUpdate = true,
		autoToast = false,
		autoPrompt = false,
		autoRefresh = false,
		triggerDelay,
		toastDelay = 500,
		toastMessage = defaultToastMessage,
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
			return promptMessage({ newVersion: frontEnd?.version, autoUpdate });
		}
		return promptMessage;
	}, [autoUpdate, frontEnd?.version, promptMessage]);

	const _toastMessage = useMemo(() => {
		if (typeof toastMessage === "function") {
			return toastMessage({ newVersion: frontEnd?.version, autoUpdate });
		}
		return toastMessage;
	}, [autoUpdate, frontEnd?.version, toastMessage]);

	const toastRefresh = useCallback(() => {
		toastEx.warn(_toastMessage, {
			position: "bottom-right",
		});
	}, [_toastMessage]);

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

	const promptRefresh = useCallback(() => {
		Cookies.remove("updated-version");
		dialogs.confirm({
			message: _promptMessage,
			onConfirm: () => {
				location.reload();
			},
		});
	}, [_promptMessage, dialogs]);

	useChangeTracking(async () => {
		if (isRefreshRequired) {
			if (autoUpdate) {
				const newVersion = frontEnd?.version;
				Cookies.set("updated-version", newVersion);
				await updateServiceWorker(autoRefresh);
				if (autoToast) {
					setTimeout(toastRefresh, triggerDelay ?? toastDelay);
				} else if (autoPrompt) {
					setTimeout(promptRefresh, triggerDelay ?? toastDelay);
				}
			} else {
				setTimeout(toastRefresh, triggerDelay ?? toastDelay);
			}
		}
	}, [isRefreshRequired]);

	// useRunOnce(() => {
	// 	if (autoToastUpdated) {
	// 		toastUpdated();
	// 	}
	// });

	return {
		toastRefresh,
		isUpToDate,
		isRefreshRequired,
		newVersion,
	};
}
