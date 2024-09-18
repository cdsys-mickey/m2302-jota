import { D01Context } from "@/contexts/D01/D01Context";
import { forwardRef, useContext } from "react";
import D01SearchPopper from "./D01SearchPopper";
import { useFormContext } from "react-hook-form";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useMemo } from "react";

const D01SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const d01 = useContext(D01Context);
	const form = useFormContext();

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(d01.onSearchSubmit, d01.onSearchSubmitError)
	}, [d01.onSearchSubmit, d01.onSearchSubmitError, form]);

	const formMeta = useFormMeta(
		`
		employee,
		pdate,
		pdline
		`,
		{
			lastField: handleSubmit
		}
	)


	return (
		<FormMetaProvider {...formMeta}>
			<D01SearchPopper
				ref={ref}
				onClose={d01.handlePopperClose}
				onReset={d01.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

D01SearchPopperContainer.displayName = "D01SearchPopperContainer";
export default D01SearchPopperContainer;

