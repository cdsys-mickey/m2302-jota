import { useContext } from "react";
import { RebInitQtyContext } from "./RebInitQtyContext";

export function useRebInitQty() {
	const context = useContext(RebInitQtyContext);
	if (!context) {
		throw new Error('useRebInitQty 必須在 RebInitQtyProvider 內使用');
	}
	return context;
}