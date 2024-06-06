import { useInit } from "@/shared-hooks/useInit";
import { useDSGCodeEditor } from "../../shared-hooks/useDSGCodeEditor";
import { useAppModule } from "./useAppModule";

export const useA13 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A13",
	});
	const dsgEditor = useDSGCodeEditor({
		token,
		gridId: "A13",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/prod/pdlines",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...appModule,
		...dsgEditor,
	};
};
