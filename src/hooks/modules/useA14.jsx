import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "@/shared-hooks/useWebApiDSG";
import { useAppModule } from "./useAppModule";

export const useA14 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A14",
	});
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A14",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/prod/outbound-types",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...appModule,
		...dsgEditor,
	};
};
