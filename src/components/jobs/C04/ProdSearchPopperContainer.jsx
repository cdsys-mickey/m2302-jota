import { A01Context } from "@/modules/A01/A01Context";
import { forwardRef, useContext } from "react";
import { useFormContext } from "react-hook-form";
import ProdSearchPopper from "./C04SearchPopper";

const ProdSearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const a01 = useContext(A01Context);
	const form = useFormContext();

	// const handleReset = useCallback(() => {
	// 	form.reset({
	// 		qs: form.getValues("qs"),
	// 	});
	// }, [form]);

	return (
		<ProdSearchPopper
			ref={ref}
			onClose={a01.handlePopperClose}
			onReset={a01.handleReset({ reset: form.reset })}
			// onReset={handleReset}
			{...rest}
		/>
	);
});

ProdSearchPopperContainer.displayName = "ProdSearchPopperContainer";
export default ProdSearchPopperContainer;
