import { D05Context } from "@/contexts/D05/D05Context";
import { forwardRef, useContext } from "react";
import D05SearchPopper from "./D05SearchPopper";
import { useFormContext } from "react-hook-form";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

const D05SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const d05 = useContext(D05Context);
	const form = useFormContext();

	// const handleSubmit = useMemo(() => {
	// 	return form.handleSubmit(d05.onSearchSubmit, d05.onSearchSubmitError);
	// }, [d05.onSearchSubmit, d05.onSearchSubmitError, form])

	const formMeta = useFormMeta(
		`
		wdate,
		employee
		`
	)

	return (
		<FormMetaProvider {...formMeta}>
			<D05SearchPopper
				ref={ref}
				onClose={d05.handlePopperClose}
				onReset={d05.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

D05SearchPopperContainer.displayName = "D05SearchPopperContainer";
export default D05SearchPopperContainer;

