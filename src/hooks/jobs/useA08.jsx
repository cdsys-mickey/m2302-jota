import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAppModule } from "@/hooks/jobs/useAppModule";

export const useA08 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A08",
	});

	const grid = useDSG({
		gridId: "A08",
		keyColumn: "CodeID",
		otherColumns: "CodeData,areaType",
	});



	return {
		grid,
		// gridMeta,
		// codeEditor,
		...appModule,
	};
};
