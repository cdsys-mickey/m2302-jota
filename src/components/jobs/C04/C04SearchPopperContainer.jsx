import { C04Context } from "@/contexts/C04/C04Context";
import { forwardRef, useContext } from "react";
import { useFormContext } from "react-hook-form";
import C04SearchPopper from "./C04SearchPopper";

const C04SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const c04 = useContext(C04Context);
	const form = useFormContext();

	// const handleReset = useCallback(() => {
	// 	form.reset({
	// 		qs: form.getValues("qs"),
	// 	});
	// }, [form]);

	return (
		<C04SearchPopper
			ref={ref}
			onClose={c04.handlePopperClose}
			onReset={c04.handleReset({ reset: form.reset })}
			// onReset={handleReset}
			{...rest}
		/>
	);
});

C04SearchPopperContainer.displayName = "C04SearchPopperContainer";
export default C04SearchPopperContainer;
