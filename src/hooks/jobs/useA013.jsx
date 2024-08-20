import ProdGrid from "@/modules/md-prod-grid";
import A013 from "../../modules/md-a013";
import { useProdGrid } from "../useProdGrid";
import { useAppModule } from "./useAppModule";

export const useA013 = ({ token } = {}) => {
	const appModule = useAppModule({
		token,
		moduleId: "A013",
	});
	const prodGrid = useProdGrid({
		token,
		gridId: "A013",
		keyColumn: "ProdID",
		otherColumns: "ProdData,SRate,IRate,MRate",
		baseUri: "v1/prod/data-grid/A013",
		transformAsQueryParams: ProdGrid.transformAsQueryParams,
		transformForSubmitting: A013.transformForSubmitting,
		transformForReading: A013.transformForReading,
	});

	return {
		...appModule,
		...prodGrid,
	};
};
