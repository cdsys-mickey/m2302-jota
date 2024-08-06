import { useInit } from "@/shared-hooks/useInit";
import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import { useAppModule } from "./useAppModule";

export const useA10 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A10",
	});
	const dsgEditor = useDSGCodeEditor({
		token,
		gridId: "A10",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/sales/customer/transports",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...appModule,
		...dsgEditor,
	};
};
