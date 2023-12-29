import ProdGrid from "@/modules/md-prod-grid";
import { useProdGrid } from "../useProdGrid";
import A014 from "../../modules/md-a014";

export const useA014 = ({ token } = {}) => {
	const prodGrid = useProdGrid({
		token,
		gridId: "A014",
		keyColumn: "ProdID",
		otherColumns: "ProdData,Price,PriceA,PriceB,PriceC,PriceD,PriceE",
		baseUri: "v1/prod-grid/A014",
		transformAsQueryParams: ProdGrid.transformAsQueryParams,
		transformForSubmit: A014.transformForSubmit,
		transformForGridEdior: A014.transformForGridEdior,
	});

	return {
		...prodGrid,
	};
};
