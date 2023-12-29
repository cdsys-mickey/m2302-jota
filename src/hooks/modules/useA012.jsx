import A012 from "@/modules/md-a012";
import ProdGrid from "@/modules/md-prod-grid";
import { useProdGrid } from "../useProdGrid";

export const useA012 = ({ token } = {}) => {
	const prodGrid = useProdGrid({
		token,
		gridId: "A012",
		keyColumn: "ProdID",
		otherColumns: "ProdData,SafeQty,StdCost,bunit,sunit,iunit,munit",
		baseUri: "v1/prod-grid/A012",
		transformAsQueryParams: ProdGrid.transformAsQueryParams,
		transformForSubmit: A012.transformForSubmit,
		transformForGridEdior: A012.transformForGridEdior,
	});

	return {
		...prodGrid,
	};
};
