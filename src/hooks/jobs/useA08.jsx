import { useInit } from "@/shared-hooks/useInit";
import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import { useAppModule } from "./useAppModule";
import A08 from "../../modules/md-a08";
import { useCallback } from "react";

export const useA08 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A08",
	});

	// const transformForReading = useCallback((opts) => {
	// 	return A08.transformForReading(opts);
	// }, []);

	const dsgEditor = useDSGCodeEditor({
		token,
		gridId: "A08",
		keyColumn: "CodeID",
		otherColumns: "CodeData,areaType",
		baseUri: "v1/sales/customer/areas",
		// transformForReading: transformForReading,
		transformForReading: A08.transformForReading,
		transformForSubmitting: A08.transformForSubmitting,
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...dsgEditor,
		...appModule,
	};
};
