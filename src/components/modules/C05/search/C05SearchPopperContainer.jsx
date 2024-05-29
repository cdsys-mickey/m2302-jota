import { C05Context } from "@/contexts/C05/C05Context";
import { forwardRef, useContext } from "react";
import C05SearchPopper from "./C05SearchPopper";
import { useFormContext } from "react-hook-form";

const C05SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const c05 = useContext(C05Context);
	const form = useFormContext();

	return (
		<C05SearchPopper
			ref={ref}
			onClose={c05.handlePopperClose}
			onReset={c05.handleReset({ reset: form.reset })}
			{...rest}
		/>
	);
});

C05SearchPopperContainer.displayName = "C05SearchPopperContainer";
export default C05SearchPopperContainer;
