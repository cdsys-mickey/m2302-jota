import React from "react";
import ProdSearchPopper from "./ProdSearchPopper";
import { forwardRef } from "react";
import { useCrud } from "@/contexts/crud/useCrud";

const ProdSearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const { handlePopperClose } = useCrud();

	return <ProdSearchPopper ref={ref} onClose={handlePopperClose} {...rest} />;
});

ProdSearchPopperContainer.displayName = "ProdSearchPopperContainer";
export default ProdSearchPopperContainer;
