import CrudContext from "@/contexts/crud/CrudContext";
import useRedirect from "@/shared-hooks/useRedirect";
import Cookies from "js-cookie";
import { useCallback, useContext } from "react";
import AppRoutes from "../modules/md-app-routes";
import Auth from "../modules/Auth.mjs";
import { AppContext } from "@/contexts/app/AppContext";
import { AuthContext } from "@/contexts/auth/AuthContext";

const useAppRedirect = () => {
	const { redirectTo } = useRedirect();
	const crud = useContext(CrudContext);
	const { getSessionCookie } = useContext(AppContext) ?? {};
	const app = useContext(AppContext);
	const auth = useContext(AuthContext);

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

	const toLogin = useCallback(
		(opts = {}) => {
			const { clearSession = true } = opts;
			if (clearSession) {
				Cookies.remove(Auth.COOKIE_LOGKEY, Auth.ROOT_COOKIE_OPTS);
				sessionStorage.removeItem(Auth.COOKIE_LOGKEY);
			}

			const loginUrl = getSessionCookie(Auth.COOKIE_LOGIN);

			if (loginUrl) {
				redirectTo(loginUrl, { replace: true });
				return;
			}

			const impersonte =
				sessionStorage.getItem(Auth.COOKIE_IMPERSONATE) == 1;
			redirectTo(
				impersonte
					? import.meta.env.VITE_URL_LOGINX
					: import.meta.env.VITE_URL_LOGIN,
				{ replace: true }
			);
		},
		[getSessionCookie, redirectTo]
	);

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

	const toForbidden = useCallback(() => {
		toRoot("forbidden");
	}, [toRoot]);

	return {
		toLanding,
		toLogin,
		toModule,
		toRoot,
		toHome,
		toMessages,
		toRenew,
		toForbidden,
		gotoSettings,
	};
};

export default useAppRedirect;
