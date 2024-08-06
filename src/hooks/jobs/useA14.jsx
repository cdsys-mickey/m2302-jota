import { useInit } from "@/shared-hooks/useInit";
import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import { useAppModule } from "./useAppModule";

export const useA14 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A14",
	});
	const dsgEditor = useDSGCodeEditor({
		token,
		gridId: "A14",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/prod/outbound-types",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...appModule,
		...dsgEditor,
	};
};
