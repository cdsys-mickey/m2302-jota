import { AppContext } from "@/contexts/app/AppContext";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useCallback, useContext, useMemo } from "react";
import { useChangeTracking } from "./useChangeTracking";

export default function useVersionCheck(opts) {
	const { autoPrompt = true } = opts ?? {};
	const { version, loading, frontEnd } = useContext(AppContext);
	const dialogs = useContext(DialogsContext);

	const promptRefresh = useCallback(() => {
		dialogs.confirm({
			message: `偵測到新版本 ${frontEnd?.version}, 按下「確定更新」即可更新\n*** 若更新後仍持續提示，請手動按 Ctrl+F5 強制重新整理`,
			confirmText: "更新",
			onConfirm: () => {
				window.location.reload(true);
			},
		});
	}, [dialogs, frontEnd?.version]);

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
