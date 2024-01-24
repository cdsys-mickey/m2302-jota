import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";
import { useAppModule } from "./useAppModule";

export const useA11 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A11",
	});
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A11",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/banks",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...dsgEditor,
		...appModule,
	};
};
