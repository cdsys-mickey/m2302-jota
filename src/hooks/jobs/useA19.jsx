import { useCallback, useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import A19 from "@/modules/md-a19";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useAppModule } from "./useAppModule";

export const useA19 = () => {
	const { token, operator } = useContext(AuthContext);
	const { postToBlank } = useHttpPost();
	const appModule = useAppModule({
		token,
		moduleId: "A19",
	});

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = A19.transformForSubmit(payload);
			console.log("data", data);
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebA19Rep.aspx?LogKey=${
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
