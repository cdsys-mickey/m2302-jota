import A012 from "@/modules/md-a012";
import ProdGrid from "@/modules/md-prod-grid";
import { useProdGrid } from "../useProdGrid";
import { useAppModule } from "./useAppModule";

export const useA012 = ({ token } = {}) => {
	const appModule = useAppModule({
		token,
		moduleId: "A012",
	});
	const prodGrid = useProdGrid({
		token,
		gridId: "A012",
		keyColumn: "ProdID",
		otherColumns: "ProdData,SafeQty,StdCost,bunit,sunit,iunit,munit",
		baseUri: "v1/prod/data-grid/A012",
		transformAsQueryParams: ProdGrid.transformAsQueryParams,
		transformForSubmitting: A012.transformForSubmitting,
		transformForReading: A012.transformForReading,
	});

	return {
		...appModule,
		...prodGrid,
	};
};
