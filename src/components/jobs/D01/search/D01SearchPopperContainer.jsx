import { D01Context } from "@/contexts/D01/D01Context";
import { forwardRef, useContext } from "react";
import D01SearchPopper from "./D01SearchPopper";
import { useFormContext } from "react-hook-form";

const D01SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const d01 = useContext(D01Context);
	const form = useFormContext();

	return (
		<D01SearchPopper
			ref={ref}
			onClose={d01.handlePopperClose}
			onReset={d01.handleReset({ reset: form.reset })}
			{...rest}
		/>
	);
});

D01SearchPopperContainer.displayName = "D01SearchPopperContainer";
export default D01SearchPopperContainer;
