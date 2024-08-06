import { useInit } from "@/shared-hooks/useInit";
import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import { useAppModule } from "./useAppModule";

export const useA09 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A09",
	});
	const dsgEditor = useDSGCodeEditor({
		token,
		gridId: "A09",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/sales/customer/channels",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...appModule,
		...dsgEditor,
	};
};
