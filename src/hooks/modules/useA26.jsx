import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "@/shared-hooks/useWebApiDSG";
import { useAppModule } from "./useAppModule";

export const useA26 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A26",
	});
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A26",
		keyColumn: "CodeID",
		otherColumns: "CodeData,Other1",
		baseUri: "v1/prod/cms-types",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...appModule,
		...dsgEditor,
	};
};
