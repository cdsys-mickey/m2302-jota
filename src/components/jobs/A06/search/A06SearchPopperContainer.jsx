import { A06Context } from "@/contexts/A06/A06Context";
import { forwardRef, useContext } from "react";
import { useFormContext } from "react-hook-form";
import A06SearchPopper from "./A06SearchPopper";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

const A06SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const a06 = useContext(A06Context);
	const form = useFormContext();

	const formMeta = useFormMeta(
		`
		lvId,
		lvName,
		lvEmployee,
		lvArea,
		lvPaymentType,
		lvBank,
		`);


	return (
		<FormMetaProvider {...formMeta}>
			<A06SearchPopper
				ref={ref}
				onClose={a06.handlePopperClose}
				onReset={a06.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

A06SearchPopperContainer.displayName = "A06SearchPopperContainer";
export default A06SearchPopperContainer;
