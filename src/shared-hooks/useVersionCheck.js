import { AppContext } from "@/contexts/app/AppContext";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useCallback, useContext, useMemo } from "react";
import { useChangeTracking } from "./useChangeTracking";

export default function useVersionCheck(opts) {
	const { autoPrompt = true } = opts ?? {};
	const { frontEnd, version, loading } = useContext(AppContext);
	const dialogs = useContext(DialogsContext);

	const promptRefresh = useCallback(() => {
		dialogs.confirm({
			message: `偵測到新版本 ${frontEnd?.minVersion}, 按下「確定更新」即可更新\n*** 若更新後仍持續提示，請手動按 Ctrl+F5 強制重新整理`,
			confirmText: "更新",
			onConfirm: () => {
				window.location.reload(true);
			},
		});
	}, [dialogs, frontEnd?.minVersion]);

	const isUpToDate = useMemo(() => {
		return loading == false && version >= frontEnd?.minVersion;
	}, [frontEnd?.minVersion, loading, version]);

	const isRefreshRequired = useMemo(() => {
		return (
			import.meta.env.VITE_PROFILE !== "dev" &&
			loading == false &&
			frontEnd?.minVersion > version
		);
	}, [frontEnd?.minVersion, loading, version]);

	useChangeTracking(() => {
		if (autoPrompt && isRefreshRequired) {
			setTimeout(promptRefresh, 1000);
		}
	}, [isRefreshRequired]);

	return {
		promptRefresh,
		isUpToDate,
		isRefreshRequired,
	};
}
