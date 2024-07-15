import ProdGrid from "@/modules/md-prod-grid";
import { useProdGrid } from "../useProdGrid";
import A014 from "../../modules/md-a014";
import { useCallback } from "react";
import { useAppModule } from "./useAppModule";

export const useA014 = ({ token } = {}) => {
	const appModule = useAppModule({
		token,
		moduleId: "A014",
	});
	const prodGrid = useProdGrid({
		token,
		gridId: "A014",
		keyColumn: "ProdID",
		otherColumns: "ProdData,Price,PriceA,PriceB,PriceC,PriceD,PriceE",
		baseUri: "v1/prod/data-grid/A014",
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
		...appModule,
		...prodGrid,
		handleCreateRow,
	};
};
