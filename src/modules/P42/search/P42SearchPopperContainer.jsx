import { P42Context } from "@/modules/P42/P42Context";
import { forwardRef, useContext } from "react";
import { useFormContext } from "react-hook-form";
import P42SearchPopper from "./P42SearchPopper";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

const P42SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const p42 = useContext(P42Context);
	const form = useFormContext();

	const formMeta = useFormMeta(
		`
		lvId,
		lvName,
		lvBank,
		`);


	return (
		<FormMetaProvider {...formMeta}>
			<P42SearchPopper
				ref={ref}
				onClose={p42.handlePopperClose}
				onReset={p42.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

P42SearchPopperContainer.displayName = "P42SearchPopperContainer";
export default P42SearchPopperContainer;



