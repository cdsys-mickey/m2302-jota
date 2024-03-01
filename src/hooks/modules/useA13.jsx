import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";
import { useAppModule } from "./useAppModule";

export const useA13 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A13",
	});
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A13",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/prod/pdlines",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...appModule,
		...dsgEditor,
	};
};
