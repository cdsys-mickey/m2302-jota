import { forwardRef, useContext } from "react";
import ProdSearchPopper from "./ProdSearchPopper";
import { A01Context } from "@/contexts/a01/A01Context";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useCallback } from "react";

const ProdSearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const a01 = useContext(A01Context);
	// const form = useFormContext();

	// const handleReset = useCallback(() => {
	// 	form.reset({
	// 		qs: form.getValues("qs"),
	// 	});
	// }, [form]);

	return (
		<ProdSearchPopper
			ref={ref}
			onClose={a01.handlePopperClose}
			// onReset={handleReset}
			{...rest}
		/>
	);
});

ProdSearchPopperContainer.displayName = "ProdSearchPopperContainer";
export default ProdSearchPopperContainer;
