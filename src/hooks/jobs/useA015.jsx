import ProdGrid from "@/modules/md-prod-grid";
import { useProdGrid } from "../useProdGrid";
import A015 from "../../modules/md-a015";
import { useAppModule } from "./useAppModule";

export const useA015 = ({ token } = {}) => {
	const appModule = useAppModule({
		token,
		moduleId: "A015",
	});
	const prodGrid = useProdGrid({
		token,
		gridId: "A015",
		keyColumn: "ProdID",
		otherColumns: "ProdData,Price,PriceA,PriceB,PriceC,PriceD,PriceE",
		baseUri: "v1/prod/data-grid/A015",
		transformAsQueryParams: ProdGrid.transformAsQueryParams,
		transformForSubmitting: A015.transformForSubmitting,
		transformForReading: A015.transformForReading,
	});

	return {
		...appModule,
		...prodGrid,
	};
};
