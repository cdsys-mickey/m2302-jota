import A011 from "@/modules/md-a011";
import ProdGrid from "@/modules/md-prod-grid";
import { useProdGrid } from "../useProdGrid";
import { useAppModule } from "./useAppModule";

export const useA011 = ({ token } = {}) => {
	const appModule = useAppModule({
		token,
		moduleId: "A011",
	});
	const prodGrid = useProdGrid({
		token,
		gridId: "A011",
		keyColumn: "ProdID",
		otherColumns: "ProdData_N,Price,PriceA,PriceB,PriceC,PriceD,PriceE",
		baseUri: "v1/prod/data-grid/A011",
		transformAsQueryParams: ProdGrid.transformAsQueryParams,
		transformForSubmit: A011.transformForSubmit,
		transformForGridEdior: A011.transformForGridEdior,
	});

	return {
		...appModule,
		...prodGrid,
	};
};