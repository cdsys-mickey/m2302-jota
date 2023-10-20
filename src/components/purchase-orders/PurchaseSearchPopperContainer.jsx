import React from "react";
import PurchaseSearchPopper from "./PurchaseSearchPopper";
import { forwardRef } from "react";
import { useCrud } from "@/contexts/crud/useCrud";

const PurchaseSearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const { handlePopperClose } = useCrud();

	return (
		<PurchaseSearchPopper ref={ref} onClose={handlePopperClose} {...rest} />
	);
});

PurchaseSearchPopperContainer.displayName = "PurchaseSearchPopperContainer";
export default PurchaseSearchPopperContainer;
