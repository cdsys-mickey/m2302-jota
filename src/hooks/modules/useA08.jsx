import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";
import { useAppModule } from "./useAppModule";

export const useA08 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A08",
	});
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A08",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/sale/customer/areas",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...dsgEditor,
		...appModule,
	};
};
