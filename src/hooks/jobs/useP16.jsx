import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAppModule } from "./useAppModule";

export const useP16 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "P16",
	});

	const grid = useDSG({
		gridId: "P16",
		keyColumn: "PosNo",
		otherColumns: "dept,Remark",
	});

	return {
		grid,
		...appModule,
	};
};
