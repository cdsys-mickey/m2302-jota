import { D05Context } from "@/contexts/D05/D05Context";
import { forwardRef, useContext } from "react";
import D05SearchPopper from "./D05SearchPopper";
import { useFormContext } from "react-hook-form";

const D05SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const d05 = useContext(D05Context);
	const form = useFormContext();

	return (
		<D05SearchPopper
			ref={ref}
			onClose={d05.handlePopperClose}
			onReset={d05.handleReset({ reset: form.reset })}
			{...rest}
		/>
	);
});

D05SearchPopperContainer.displayName = "D05SearchPopperContainer";
export default D05SearchPopperContainer;

