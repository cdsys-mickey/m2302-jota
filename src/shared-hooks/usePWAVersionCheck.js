import { AppContext } from "@/contexts/app/AppContext";
import { useCallback, useContext, useMemo } from "react";
import { toastEx } from "shared-components/toast-ex";
import { useChangeTracking } from "./useChangeTracking";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import Cookies from "js-cookie";
import { useRunOnce } from "./useRunOnce";

const defaultPromptMessage = ({ newVersion, autoUpdate }) => {
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
			return promptMessage({ newVersion: frontEnd?.version, autoUpdate });
		}
		return promptMessage;
	}, [autoUpdate, frontEnd?.version, promptMessage]);

	const toastRefresh = useCallback(() => {
		toastEx.warn(_promptMessage, {
			position: "bottom-right",
		});
	}, [_promptMessage]);

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

	const toastUpdated = useCallback(
		(newVersion) => {
			const updated = newVersion || Cookies.get("updated-version");
			if (updated) {
				Cookies.remove("updated-version");
				toastEx.info(`版本 ${updated} 已更新`);
				dialogs.confirm({
					message: `新版本 ${updated} 已更新完成, 按下「確定」即可繼續使用\n*** 若套用後仍持續提示，請手動按 Ctrl+F5 強制重新整理`,
					onConfirm: () => {
						location.reload();
					},
				});
			}
		},
		[dialogs]
	);

	useChangeTracking(async () => {
		if (isRefreshRequired) {
			if (autoUpdate) {
				if (autoRefresh) {
					Cookies.set("updated-version", frontEnd?.version);
					await updateServiceWorker(true);
					// setTimeout(() => {
					// 	location.reload();
					// }, 500);
					toastUpdated(frontEnd?.version);
				} else {
					await updateServiceWorker(true);
					setTimeout(toastRefresh, triggerDelay ?? toastDelay);
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
