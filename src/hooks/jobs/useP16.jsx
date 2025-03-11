import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAppModule } from "@/hooks/jobs/useAppModule";

export const useP16 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A27",
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
