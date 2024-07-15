import { D02Context } from "@/contexts/D02/D02Context";
import { forwardRef, useContext } from "react";
import D02SearchPopper from "./D02SearchPopper";
import { useFormContext } from "react-hook-form";

const D02SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const d02 = useContext(D02Context);
	const form = useFormContext();

	return (
		<D02SearchPopper
			ref={ref}
			onClose={d02.handlePopperClose}
			onReset={d02.handleReset({ reset: form.reset })}
			{...rest}
		/>
	);
});

D02SearchPopperContainer.displayName = "D02SearchPopperContainer";
export default D02SearchPopperContainer;


