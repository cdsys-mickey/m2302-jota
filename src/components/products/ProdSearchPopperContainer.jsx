import React from "react";
import ProdSearchPopper from "./ProdSearchPopper";
import { forwardRef } from "react";
import { useCrudZZ } from "@/contexts/crud/useCrudZZ";

const ProdSearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const { handlePopperClose } = useCrudZZ();

	return <ProdSearchPopper ref={ref} onClose={handlePopperClose} {...rest} />;
});

ProdSearchPopperContainer.displayName = "ProdSearchPopperContainer";
export default ProdSearchPopperContainer;
