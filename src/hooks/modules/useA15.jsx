import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";
import { useAppModule } from "./useAppModule";

export const useA15 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A15",
	});
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A15",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/ou/employees",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...appModule,
		...dsgEditor,
	};
};
