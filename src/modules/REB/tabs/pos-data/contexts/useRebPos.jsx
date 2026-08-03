import { useContext } from "react";
import { RebPosContext } from "./RebPosContext";

export function useRebPos() {
	const context = useContext(RebPosContext);
	if (!context) {
		throw new Error('useRebPos 必須在 RebPosProvider 內使用');
	}
	return context;
}