import { useCallback } from "react";
import useRedirect from "@/shared-hooks/useRedirect";
import AppRoutes from "../modules/md-app-routes";
import Cookies from "js-cookie";
import Auth from "../modules/md-auth";

const useAppRedirect = () => {
	const { redirectTo } = useRedirect();

	const toLanding = useCallback(() => {
		redirectTo(import.meta.env.VITE_URL_LANDING, { replace: true });
	}, [redirectTo]);

	const toLogin = useCallback(() => {
		const impersonte = Cookies.get(Auth.COOKIE_MODE) === "im";
		redirectTo(
			impersonte
				? import.meta.env.VITE_URL_LOGINX
				: import.meta.env.VITE_URL_LOGIN,
			{ replace: true }
		);
	}, [redirectTo]);

	const toModule = useCallback(
		(moduleId) => {
			redirectTo(`/${AppRoutes.MODULES}/${moduleId}`);
		},
		[redirectTo]
	);

	const toRoot = useCallback(
		(rootModule) => {
			redirectTo(`/${rootModule}`);
		},
		[redirectTo]
	);

	const toHome = useCallback(() => {
		toRoot("home");
	}, [toRoot]);

	const toMessages = useCallback(() => {
		toRoot("messages");
	}, [toRoot]);

	return {
		toLanding,
		toLogin,
		toModule,
		toRoot,
		toHome,
		toMessages,
	};
};

export default useAppRedirect;
