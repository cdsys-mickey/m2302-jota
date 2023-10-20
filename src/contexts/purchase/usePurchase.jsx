import { useContext } from "react";
import { PurchaseContext } from "./PurchaseContext";

export const usePurchase = () => {
	return useContext(PurchaseContext);
};
