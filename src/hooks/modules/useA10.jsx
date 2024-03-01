import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";
import { useAppModule } from "./useAppModule";

export const useA10 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A10",
	});
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A10",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/sale/customer/transports",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...appModule,
		...dsgEditor,
	};
};
