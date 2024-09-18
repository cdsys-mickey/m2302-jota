import { D041Context } from "@/contexts/D041/D041Context";
import { forwardRef, useContext } from "react";
import D041SearchPopper from "./D041SearchPopper";
import { useFormContext } from "react-hook-form";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

const D041SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const d041 = useContext(D041Context);
	const form = useFormContext();

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(d041.onSearchSubmit, d041.onSearchSubmitError);
	}, [d041.onSearchSubmit, d041.onSearchSubmitError, form]);

	const formMeta = useFormMeta(
		`
		employee,
		sdate,
		pdline
		`,
		{
			lastField: handleSubmit
		}
	)

	return (
		<FormMetaProvider {...formMeta}>
			<D041SearchPopper
				ref={ref}
				onClose={d041.handlePopperClose}
				onReset={d041.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

D041SearchPopperContainer.displayName = "D041SearchPopperContainer";
export default D041SearchPopperContainer;



