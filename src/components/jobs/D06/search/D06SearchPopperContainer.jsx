import { D06Context } from "@/contexts/D06/D06Context";
import { forwardRef, useContext } from "react";
import D06SearchPopper from "./D06SearchPopper";
import { useFormContext } from "react-hook-form";

const D06SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const d06 = useContext(D06Context);
	const form = useFormContext();

	return (
		<D06SearchPopper
			ref={ref}
			onClose={d06.handlePopperClose}
			onReset={d06.handleReset({ reset: form.reset })}
			{...rest}
		/>
	);
});

D06SearchPopperContainer.displayName = "D06SearchPopperContainer";
export default D06SearchPopperContainer;



