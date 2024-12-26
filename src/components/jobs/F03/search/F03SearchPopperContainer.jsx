import { F03Context } from "@/contexts/F03/F03Context";
import { forwardRef, useContext } from "react";
import F03SearchPopper from "./F03SearchPopper";
import { useFormContext } from "react-hook-form";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

const F03SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const f03 = useContext(F03Context);
	const form = useFormContext();

	// const handleSubmit = useMemo(() => {
	// 	return form.handleSubmit(f03.onSearchSubmit, f03.onSearchSubmitError)
	// }, [f03.onSearchSubmit, f03.onSearchSubmitError, form])

	const formMeta = useFormMeta(
		`
		employee
		`,
	)

	return (
		<FormMetaProvider {...formMeta}>
			<F03SearchPopper
				ref={ref}
				onClose={f03.handlePopperClose}
				onReset={f03.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

F03SearchPopperContainer.displayName = "F03SearchPopperContainer";
export default F03SearchPopperContainer;





