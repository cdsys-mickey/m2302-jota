import React from "react";
import PurchaseSearchPopper from "./PurchaseSearchPopper";
import { forwardRef } from "react";
import { useCrudZZ } from "@/contexts/crud/useCrudZZ";

const PurchaseSearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const { handlePopperClose } = useCrudZZ();

	return (
		<PurchaseSearchPopper ref={ref} onClose={handlePopperClose} {...rest} />
	);
});

PurchaseSearchPopperContainer.displayName = "PurchaseSearchPopperContainer";
export default PurchaseSearchPopperContainer;
