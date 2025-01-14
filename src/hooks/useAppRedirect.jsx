import { useCallback } from "react";
import useRedirect from "@/shared-hooks/useRedirect";
import AppRoutes from "../modules/md-app-routes";
import Cookies from "js-cookie";
import Auth from "../modules/md-auth";
import { useContext } from "react";
import CrudContext from "@/contexts/crud/CrudContext";

const useAppRedirect = () => {
	const { redirectTo } = useRedirect();
	const crud = useContext(CrudContext);

	const toRenew = useCallback(() => {
		redirectTo("/renew");
	}, [redirectTo]);

	const toLanding = useCallback(
		({ reloadAuthorities = false } = {}) => {
			redirectTo(import.meta.env.VITE_URL_LANDING, {
				replace: true,
				params: {
					...(reloadAuthorities && {
						reload: 1,
					}),
				},
			});
		},
		[redirectTo]
	);

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
		(moduleId, params) => {
			crud?.cancelAction();
			redirectTo(`/${AppRoutes.MODULES}/${moduleId}`, {
				...(params && {
					params,
				}),
			});
		},
		[crud, redirectTo]
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
		toRoot("msgs");
	}, [toRoot]);

	const gotoSettings = useCallback(() => {
		toRoot("settings");
	}, [toRoot]);

	return {
		toLanding,
		toLogin,
		toModule,
		toRoot,
		toHome,
		toMessages,
		toRenew,
		gotoSettings,
	};
};

export default useAppRedirect;
