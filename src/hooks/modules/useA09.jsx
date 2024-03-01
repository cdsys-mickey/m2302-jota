import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";
import { useAppModule } from "./useAppModule";

export const useA09 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A09",
	});
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A09",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/sale/customer/channels",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...appModule,
		...dsgEditor,
	};
};
