import { D06Context } from "@/contexts/D06/D06Context";
import { forwardRef, useContext } from "react";
import D06SearchPopper from "./D06SearchPopper";
import { useFormContext } from "react-hook-form";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

const D06SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const d06 = useContext(D06Context);
	const form = useFormContext();

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(d06.onSearchSubmit, d06.onSearchSubmitError)
	}, [d06.onSearchSubmit, d06.onSearchSubmitError, form])

	const formMeta = useFormMeta(
		`
		employee,
		bdate
		`,
		{
			lastField: handleSubmit
		}
	)

	return (
		<FormMetaProvider {...formMeta}>
			<D06SearchPopper
				ref={ref}
				onClose={d06.handlePopperClose}
				onReset={d06.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

D06SearchPopperContainer.displayName = "D06SearchPopperContainer";
export default D06SearchPopperContainer;



