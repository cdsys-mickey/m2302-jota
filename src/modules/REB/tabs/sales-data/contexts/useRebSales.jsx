import { useContext } from "react";
import { RebSalesContext } from "./RebSalesContext";

export function useRebSales() {
	const context = useContext(RebSalesContext);
	if (!context) {
		throw new Error('useRebSales 必須在 RebSalesProvider 內使用');
	}
	return context;
}