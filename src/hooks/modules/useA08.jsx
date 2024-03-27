import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";
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

	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A08",
		keyColumn: "CodeID",
		otherColumns: "CodeData,areaType",
		baseUri: "v1/sale/customer/areas",
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
