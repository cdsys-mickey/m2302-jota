import { C09Context } from "@/contexts/C09/C09Context";
import { forwardRef, useContext } from "react";
import C09SearchPopper from "./C09SearchPopper";
import { useFormContext } from "react-hook-form";

const C09SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const c09 = useContext(C09Context);
	const form = useFormContext();

	return (
		<C09SearchPopper
			ref={ref}
			onClose={c09.handlePopperClose}
			onReset={c09.handleReset({ reset: form.reset })}
			{...rest}
		/>
	);
});

C09SearchPopperContainer.displayName = "C09SearchPopperContainer";
export default C09SearchPopperContainer;