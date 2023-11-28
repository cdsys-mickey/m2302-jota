import React from "react";
import ProdSearchPopper from "./MockProdSearchPopper";
import { forwardRef } from "react";
import { useCrudZZ } from "@/contexts/crud/useCrudZZ";

const MockProdSearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const { handlePopperClose } = useCrudZZ();

	return <ProdSearchPopper ref={ref} onClose={handlePopperClose} {...rest} />;
});

MockProdSearchPopperContainer.displayName = "MockProdSearchPopperContainer";
export default MockProdSearchPopperContainer;
