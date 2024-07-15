import { C01Context } from "@/contexts/C01/C01Context";
import { forwardRef, useContext } from "react";
import C01SearchPopper from "./C01SearchPopper";
import { useFormContext } from "react-hook-form";

const C01SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const c01 = useContext(C01Context);
	const form = useFormContext();

	return (
		<C01SearchPopper
			ref={ref}
			onClose={c01.handlePopperClose}
			onReset={c01.handleReset({
				reset: form.reset,
				getValues: form.getValues,
			})}
			{...rest}
		/>
	);
});

C01SearchPopperContainer.displayName = "C01SearchPopperContainer";
export default C01SearchPopperContainer;
