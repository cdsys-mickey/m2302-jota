import { useInit } from "@/shared-hooks/useInit";
import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import { useAppModule } from "./useAppModule";

export const useA02 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A02",
	});
	const dsgEditor = useDSGCodeEditor({
		token,
		gridId: "A02",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/prod/pkg-types",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...appModule,
		...dsgEditor,
	};
};
