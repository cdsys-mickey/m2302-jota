import { useContext } from "react";
import { REBContext } from "./REBContext";

export function useREB() {
	const context = useContext(REBContext);
	if (!context) {
		throw new Error('useREB 必須在 REBProvider 內使用');
	}
	return context;
}