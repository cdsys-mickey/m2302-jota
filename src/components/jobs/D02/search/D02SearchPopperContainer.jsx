import { D02Context } from "@/contexts/D02/D02Context";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { forwardRef, useContext } from "react";
import D02SearchPopper from "./D02SearchPopper";
import { useFormContext } from "react-hook-form";

const D02SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const d02 = useContext(D02Context);
	const form = useFormContext();

	// const handleSubmit = useMemo(() => {
	// 	return form.handleSubmit(d02.onSearchSubmit, d02.onSearchSubmitError)
	// }, [d02.onSearchSubmit, d02.onSearchSubmitError, form]);

	const formMeta = useFormMeta(
		`
		employee,
		rdate,
		pdline
		`
	);

	return (
		<FormMetaProvider {...formMeta}>
			<D02SearchPopper
				ref={ref}
				onClose={d02.handlePopperClose}
				onReset={d02.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

D02SearchPopperContainer.displayName = "D02SearchPopperContainer";
export default D02SearchPopperContainer;


