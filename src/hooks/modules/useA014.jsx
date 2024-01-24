import ProdGrid from "@/modules/md-prod-grid";
import { useProdGrid } from "../useProdGrid";
import A014 from "../../modules/md-a014";
import { useCallback } from "react";

export const useA014 = ({ token } = {}) => {
	const prodGrid = useProdGrid({
		token,
		gridId: "A014",
		keyColumn: "ProdID",
		otherColumns: "ProdData,Price,PriceA,PriceB,PriceC,PriceD,PriceE",
		baseUri: "v1/prod/prod-grid/A014",
		transformAsQueryParams: ProdGrid.transformAsQueryParams,
		transformForSubmit: A014.transformForSubmit,
		transformForGridEdior: A014.transformForGridEdior,
	});

	const handleCreateRow = useCallback(
		() => ({
			catL: null,
			catM: null,
			catS: null,
			typeA: null,
			typeB: null,
			taxType: null,
		}),
		[]
	);

	return {
		...prodGrid,
		handleCreateRow,
	};
};
