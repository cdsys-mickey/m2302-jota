import { useCallback, useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import A21 from "@/modules/md-a21";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useAppModule } from "./useAppModule";

export const useA21 = () => {
	const { token, operator } = useContext(AuthContext);
	const { postToBlank } = useHttpPost();
	const appModule = useAppModule({
		token,
		moduleId: "A21",
	});

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = A21.transformForSubmit(payload);
			console.log("data", data);
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebA21Rep.aspx?LogKey=${
					operator.LogKey
				}`,
				{
					jsonData: JSON.stringify(data),
				}
			);
		},
		[operator.LogKey, postToBlank]
	);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, []);

	return {
		...appModule,
		onSubmit,
		onSubmitError,
	};
};
[];
