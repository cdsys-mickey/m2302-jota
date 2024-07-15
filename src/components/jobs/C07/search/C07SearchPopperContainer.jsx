import { C07Context } from "@/contexts/C07/C07Context";
import { forwardRef, useContext } from "react";
import C07SearchPopper from "./C07SearchPopper";
import { useFormContext } from "react-hook-form";

const C07SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const c07 = useContext(C07Context);
	const form = useFormContext();

	return (
		<C07SearchPopper
			ref={ref}
			onClose={c07.handlePopperClose}
			onReset={c07.handleReset({ reset: form.reset })}
			onClear={c07.handleClear({ reset: form.reset })}
			{...rest}
		/>
	);
});

C07SearchPopperContainer.displayName = "C07SearchPopperContainer";
export default C07SearchPopperContainer;
