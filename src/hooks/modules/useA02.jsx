import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";
import { useAppModule } from "./useAppModule";

export const useA02 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A02",
	});
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A02",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/prod/pkg-types",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...appModule,
		...dsgEditor,
	};
};
