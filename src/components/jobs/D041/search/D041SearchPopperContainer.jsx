import { D041Context } from "@/contexts/D041/D041Context";
import { forwardRef, useContext } from "react";
import D041SearchPopper from "./D041SearchPopper";
import { useFormContext } from "react-hook-form";

const D041SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const d041 = useContext(D041Context);
	const form = useFormContext();

	return (
		<D041SearchPopper
			ref={ref}
			onClose={d041.handlePopperClose}
			onReset={d041.handleReset({ reset: form.reset })}
			{...rest}
		/>
	);
});

D041SearchPopperContainer.displayName = "D041SearchPopperContainer";
export default D041SearchPopperContainer;



