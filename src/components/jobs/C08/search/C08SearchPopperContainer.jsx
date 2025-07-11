import { C08Context } from "@/contexts/C08/C08Context";
import { forwardRef, useContext } from "react";
import C08SearchPopper from "./C08SearchPopper";
import { useFormContext } from "react-hook-form";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-components";
import { useMemo } from "react";
import { useCallback } from "react";

const C08SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const c08 = useContext(C08Context);
	const form = useFormContext();

	// const onSubmit = useMemo(() => {
	// 	return form.handleSubmit(c08.onSearchSubmit, c08.onSearchSubmitError)
	// }, [c08.onSearchSubmit, c08.onSearchSubmitError, form]);

	// const handleLastField = useCallback(() => {
	// 	onSubmit();
	// }, [onSubmit]);

	const formMeta = useFormMeta(
		`
		txoDate,
		employee,
		deliveryEmployee,
		txiDept,
		transType
		`
	)

	return (
		<FormMetaProvider {...formMeta} >
			<C08SearchPopper
				ref={ref}
				onClose={c08.handlePopperClose}
				onReset={c08.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

C08SearchPopperContainer.displayName = "C08SearchPopperContainer";
export default C08SearchPopperContainer;
