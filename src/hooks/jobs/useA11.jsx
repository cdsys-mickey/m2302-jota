import { useInit } from "@/shared-hooks/useInit";
import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import { useAppModule } from "./useAppModule";

export const useA11 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A11",
	});
	const dsgEditor = useDSGCodeEditor({
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
		...appModule,
		...dsgEditor,
	};
};
