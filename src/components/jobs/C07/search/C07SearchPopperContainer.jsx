import { C07Context } from "@/contexts/C07/C07Context";
import { forwardRef, useContext } from "react";
import C07SearchPopper from "./C07SearchPopper";
import { useFormContext } from "react-hook-form";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

const C07SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const c07 = useContext(C07Context);
	const form = useFormContext();

	const formMeta = useFormMeta(
		`
		ordDate,
		arrDate,
		ordDept,
		employee,
		squared
		`
	)

	return (
		<FormMetaProvider {...formMeta}>
			<C07SearchPopper
				ref={ref}
				onClose={c07.handlePopperClose}
				onReset={c07.handleReset({ reset: form.reset })}
				onClear={c07.handleClear({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

C07SearchPopperContainer.displayName = "C07SearchPopperContainer";
export default C07SearchPopperContainer;
