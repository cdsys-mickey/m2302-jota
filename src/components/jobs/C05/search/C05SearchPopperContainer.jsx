import { C05Context } from "@/contexts/C05/C05Context";
import { forwardRef, useContext } from "react";
import C05SearchPopper from "./C05SearchPopper";
import { useFormContext } from "react-hook-form";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

const C05SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const c05 = useContext(C05Context);
	const form = useFormContext();

	const formMeta = useFormMeta(
		`
		supplier,
		spn,
		spa,
		spu,
		inv,
		taxType,
		rd,
		employee
		`
	)

	return (
		<FormMetaProvider {...formMeta}>
			<C05SearchPopper
				ref={ref}
				onClose={c05.handlePopperClose}
				onReset={c05.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

C05SearchPopperContainer.displayName = "C05SearchPopperContainer";
export default C05SearchPopperContainer;
