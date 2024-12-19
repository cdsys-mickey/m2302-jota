import { A01Context } from "@/contexts/A01/A01Context";
import { forwardRef, useContext } from "react";
import { useFormContext } from "react-hook-form";
import A01SearchPopper from "./A01SearchPopper";

const A01SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const a01 = useContext(A01Context);
	const form = useFormContext();

	// const handleReset = useCallback(() => {
	// 	form.reset({
	// 		qs: form.getValues("qs"),
	// 	});
	// }, [form]);

	return (
		<A01SearchPopper
			ref={ref}
			onClose={a01.handlePopperClose}
			onReset={a01.handleReset({ reset: form.reset })}
			// onReset={handleReset}
			{...rest}
		/>
	);
});

A01SearchPopperContainer.displayName = "A01SearchPopperContainer";
export default A01SearchPopperContainer;
