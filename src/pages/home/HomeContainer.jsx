import { AppContext } from "@/contexts/app/AppContext";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useTheme from "@mui/material/styles/useTheme";
import { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useInit } from "@/shared-hooks/useInit";
import Home from "./Home";
import useVersionCheck from "@/shared-hooks/useVersionCheck";

const HomeContainer = () => {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const auth = useContext(AuthContext);
	const { token, loadAuthorities } = auth;

	const isLoadAuthorities = params.get("reload") === "1";
	const { detectDrawerState } = useContext(AppFrameContext);

	useInit(() => {
		detectDrawerState();
	}, []);

	useInit(() => {
		if (isLoadAuthorities) {
			loadAuthorities({ token });
		}
	}, []);

	useVersionCheck();

	return (<Home />);
};

HomeContainer.displayName = "HomeContainer";

export default HomeContainer;
