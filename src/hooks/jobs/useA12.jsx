import { useInit } from "@/shared-hooks/useInit";
import { useDSGCodeEditor } from "../../shared-hooks/useDSGCodeEditor";
import { useAppModule } from "./useAppModule";

export const useA12 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A12",
	});
	const dsgEditor = useDSGCodeEditor({
		token,
		gridId: "A12",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/sales/customer/payments",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...appModule,
		...dsgEditor,
	};
};
