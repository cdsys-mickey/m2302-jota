import { useCallback } from "react";
import useRedirect from "@/shared-hooks/useRedirect";
import AppRoutes from "../modules/md-app-routes";
import Cookies from "js-cookie";

const useAppRedirect = () => {
	const { redirectTo } = useRedirect();

	const redirectToLanding = useCallback(() => {
		redirectTo(import.meta.env.VITE_URL_LANDING, { replace: true });
	}, [redirectTo]);

	const redirectToLogin = useCallback(() => {
		const impersonte = Cookies.get("md") === "im";
		redirectTo(
			impersonte
				? import.meta.env.VITE_URL_LOGINX
				: import.meta.env.VITE_URL_LOGIN,
			{ replace: true }
		);
	}, [redirectTo]);

	const redirectToModule = useCallback(
		(moduleId) => {
			redirectTo(`/${AppRoutes.MODULES}/${moduleId}`);
		},
		[redirectTo]
	);

	return {
		redirectToLanding,
		redirectToLogin,
		redirectToModule,
	};
};

export default useAppRedirect;
