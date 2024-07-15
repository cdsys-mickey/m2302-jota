import { D07Context } from "@/contexts/D07/D07Context";
import { forwardRef, useContext } from "react";
import D07SearchPopper from "./D07SearchPopper";
import { useFormContext } from "react-hook-form";

const D07SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const d07 = useContext(D07Context);
	const form = useFormContext();

	return (
		<D07SearchPopper
			ref={ref}
			onClose={d07.handlePopperClose}
			onReset={d07.handleReset({ reset: form.reset })}
			{...rest}
		/>
	);
});

D07SearchPopperContainer.displayName = "D07SearchPopperContainer";
export default D07SearchPopperContainer;




