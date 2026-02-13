import { AppContext } from "@/contexts/app/AppContext";
import { useCallback, useContext, useMemo } from "react";
import { toastEx } from "shared-components/toast-ex";
import { useChangeTracking } from "./useChangeTracking";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import Cookies from "js-cookie";

const defaultPromptMessage = ({ newVersion, autoUpdate }) => {
	if (autoUpdate) {
		return `請按下「確定更新」套用新版本，若重新整理後仍持續提示，請手動按 Ctrl+F5 強制重新整理`;
	}
	return `請按 Ctrl+F5 強制更新`;
};

const defaultToastMessage = ({ newVersion, autoUpdate }) => {
	if (autoUpdate) {
		return `新版本 ${newVersion} 已更新完成, 重新整理(F5)後即可繼續使用\n*** 若重新整理後仍持續提示，請手動按 Ctrl+F5 強制重新整理`;
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
		return loading === false && version >= frontEnd?.version;
	}, [frontEnd?.version, loading, version]);

	const isRefreshRequired = useMemo(() => {
		return (
			needRefresh &&
			import.meta.env.VITE_PROFILE !== "dev" &&
			loading === false &&
			frontEnd?.version > version
		);
	}, [frontEnd?.version, loading, needRefresh, version]);

	const newVersion = useMemo(() => {
		return isRefreshRequired ? frontEnd?.version : null;
	}, [frontEnd?.version, isRefreshRequired]);

	/**
	 * 核心更新執行邏輯
	 * 保留 just-updated Cookie 用於重整後的狀態識別
	 */
	const applyUpdate = useCallback(async () => {
		if (updateServiceWorker) {
			await updateServiceWorker(true);
		}

		// 將新版本號存入 Cookie
		if (frontEnd?.version) {
			Cookies.set("just-updated", frontEnd.version, {
				expires: 1 / 1440,
			});
		}

		setTimeout(() => {
			const url = new URL(window.location.href);
			url.searchParams.set("t", Date.now()); // 加入時間戳，例如 ?t=1715830000000
			window.location.replace(url.toString());
		}, 200);
	}, [updateServiceWorker, frontEnd?.version]);

	/**
	 * 彈窗確認邏輯，直接串接 applyUpdate
	 */
	const promptRefresh = useCallback(() => {
		dialogs.confirm({
			title: `發現新版本 ${newVersion}`,
			message: _promptMessage,
			onConfirm: applyUpdate,
			confirmText: "確定更新",
		});
	}, [dialogs, newVersion, _promptMessage, applyUpdate]);

	useChangeTracking(async () => {
		if (isRefreshRequired) {
			if (autoUpdate) {
				// 背景靜默更新 Service Worker
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

	return {
		toastRefresh,
		isUpToDate,
		isRefreshRequired,
		newVersion,
		applyUpdate,
	};
}
