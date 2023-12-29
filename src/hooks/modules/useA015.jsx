import ProdGrid from "@/modules/md-prod-grid";
import { useProdGrid } from "../useProdGrid";
import A015 from "../../modules/md-a015";

export const useA015 = ({ token } = {}) => {
	const prodGrid = useProdGrid({
		token,
		gridId: "A015",
		keyColumn: "ProdID",
		otherColumns: "ProdData,Price,PriceA,PriceB,PriceC,PriceD,PriceE",
		baseUri: "v1/prod-grid/A015",
		transformAsQueryParams: ProdGrid.transformAsQueryParams,
		transformForSubmit: A015.transformForSubmit,
		transformForGridEdior: A015.transformForGridEdior,
	});

	return {
		...prodGrid,
	};
};
