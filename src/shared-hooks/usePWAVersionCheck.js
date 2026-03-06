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
		// 額外保險：手動清除 Cache Storage (選用，視乎你的 SW 實作)
		if ("caches" in window) {
			const keys = await caches.keys();
			await Promise.all(keys.map((key) => caches.delete(key)));
		}

		// 1. 確保 SW 進入 skipWaiting
		if (updateServiceWorker) {
			// 傳入 true 通常代表立即啟動新 SW
			await updateServiceWorker(true);
		}

		// 2. 存入 Cookie 作為重整後的標記 (原邏輯保留)
		if (frontEnd?.version) {
			Cookies.set("just-updated", frontEnd.version, {
				expires: 1 / 1440, // 1 分鐘
			});
		}

		// 3. 強制刷新頁面
		setTimeout(() => {
			// 使用 location.reload(true) 或附加隨機參數來繞過快取
			const url = new URL(window.location.href);
			url.searchParams.set("v", frontEnd?.version || Date.now());

			// 關鍵：使用 window.location.reload() 有時比 replace 更有效處理 PWA 更新
			window.location.href = url.toString();
			// 在某些瀏覽器中，這能更徹底清除狀態
			window.location.reload();
		}, 300);
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
