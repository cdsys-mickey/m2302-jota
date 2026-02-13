import { AuthContext } from "@/contexts/auth/AuthContext";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useInit } from "@/shared-hooks/useInit";
import usePWAVersionCheck from "@/shared-hooks/usePWAVersionCheck";
import { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Home from "./Home";

const HomeContainer = () => {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const auth = useContext(AuthContext);
	usePWAVersionCheck({
		autoRefresh: true,
		autoPrompt: true,
	});
	const { token, loadAuthorities } = auth;

	const isLoadAuthorities = params.get("reload") === "1";
	const { detectDrawerState } = useContext(AppFrameContext);

	const _title = useMemo(() => {
		return `${auth.operator.UserName}, 您好！`;
	}, [auth.operator.UserName])

	useInit(() => {
		detectDrawerState();
	}, []);

	useInit(() => {
		if (isLoadAuthorities) {
			loadAuthorities({ token });
		}
	}, []);

	// useVersionCheck();

	return (<Home title={_title} />);
};

HomeContainer.displayName = "HomeContainer";

export default HomeContainer;
