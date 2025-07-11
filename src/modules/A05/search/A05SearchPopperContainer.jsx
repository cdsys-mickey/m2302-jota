import { A05Context } from "@/modules/A05/A05Context";
import { forwardRef, useContext } from "react";
import { useFormContext } from "react-hook-form";
import A05SearchPopper from "./A05SearchPopper";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-components";

const A05SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const a05 = useContext(A05Context);
	const form = useFormContext();

	const formMeta = useFormMeta(
		`
		lvId,
		lvName,
		lvBank,
		`);


	return (
		<FormMetaProvider {...formMeta}>
			<A05SearchPopper
				ref={ref}
				onClose={a05.handlePopperClose}
				onReset={a05.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

A05SearchPopperContainer.displayName = "A05SearchPopperContainer";
export default A05SearchPopperContainer;
