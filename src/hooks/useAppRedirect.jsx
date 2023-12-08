import { useCallback } from "react";
import useRedirect from "@/shared-hooks/useRedirect";
import AppRoutes from "../modules/md-app-routes";
import Cookies from "js-cookie";

const useAppRedirect = () => {
	const { redirectTo } = useRedirect();

	const toLanding = useCallback(() => {
		redirectTo(import.meta.env.VITE_URL_LANDING, { replace: true });
	}, [redirectTo]);

	const toLogin = useCallback(() => {
		const impersonte = Cookies.get("md") === "im";
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

	return {
		toLanding,
		toLogin,
		toModule,
	};
};

export default useAppRedirect;
