import { D07Context } from "@/contexts/D07/D07Context";
import { forwardRef, useContext } from "react";
import D07SearchPopper from "./D07SearchPopper";
import { useFormContext } from "react-hook-form";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";

const D07SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const d07 = useContext(D07Context);
	const form = useFormContext();

	// const handleSubmit = useMemo(() => {
	// 	return form.handleSubmit(d07.onSearchSubmit, d07.onSearchSubmitError)
	// }, [d07.onSearchSubmit, d07.onSearchSubmitError, form])

	const formMeta = useFormMeta(
		`
		employee
		`
	)

	return (
		<FormMetaProvider {...formMeta}>
			<D07SearchPopper
				ref={ref}
				onClose={d07.handlePopperClose}
				onReset={d07.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

D07SearchPopperContainer.displayName = "D07SearchPopperContainer";
export default D07SearchPopperContainer;




