import { AppContext } from "@/contexts/app/AppContext";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useTheme from "@mui/material/styles/useTheme";
import { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext";
import Styles from "../../modules/md-styles";
import { useInit } from "../../shared-hooks/useInit";
import Home from "./Home";

const HomeContainer = () => {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const auth = useContext(AuthContext);
	const { frontEnd, version, loading } = useContext(AppContext);
	const { token, loadAuthorities } = auth;
	const dialogs = useContext(DialogsContext);
	const { confirm: dialogConfirm } = dialogs;

	const isLoadAuthorities = params.get("reload") === "1";
	const { drawerOpen, detectDrawerState } = useContext(AppFrameContext);

	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofHomeBox({ theme, drawerOpen }),
		[drawerOpen, theme]
	);

	useInit(() => {
		detectDrawerState();
	}, []);

	useInit(() => {
		if (isLoadAuthorities) {
			loadAuthorities({ token });
		}
	}, []);

	useChangeTracking(() => {
		if (import.meta.env.VITE_PROFILE !== "dev"
			&& loading == false
			&& frontEnd?.minVersion > version) {
			dialogs.confirm({
				message: `偵測到新版本 ${frontEnd?.minVersion}, 按下確定即可更新`,
				onConfirm: () => {
					window.location.reload();
				}
			})
		}
	}, [frontEnd?.minVersion, version, loading])

	// useChangeTracking(() => {
	// 	if (frontEnd?.minVersion && version) {
	// 		if (frontEnd?.minVersion > version) {
	// 			toastEx.error(`有新版本 ${frontEnd?.minVersion}`);
	// 		}
	// 	}
	// }, [frontEnd?.minVersion, version])

	return <Home drawerOpen={drawerOpen} theme={theme} boxStyles={boxStyles} />;
};

HomeContainer.displayName = "HomeContainer";

export default HomeContainer;
