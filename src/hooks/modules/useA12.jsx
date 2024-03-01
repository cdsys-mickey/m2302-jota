import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";
import { useAppModule } from "./useAppModule";

export const useA12 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A12",
	});
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A12",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/sale/customer/payments",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...appModule,
		...dsgEditor,
	};
};
