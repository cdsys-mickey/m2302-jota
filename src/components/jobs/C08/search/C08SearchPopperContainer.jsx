import { C08Context } from "@/contexts/C08/C08Context";
import { forwardRef, useContext } from "react";
import C08SearchPopper from "./C08SearchPopper";
import { useFormContext } from "react-hook-form";

const C08SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const c08 = useContext(C08Context);
	const form = useFormContext();

	return (
		<C08SearchPopper
			ref={ref}
			onClose={c08.handlePopperClose}
			onReset={c08.handleReset({ reset: form.reset })}
			{...rest}
		/>
	);
});

C08SearchPopperContainer.displayName = "C08SearchPopperContainer";
export default C08SearchPopperContainer;
