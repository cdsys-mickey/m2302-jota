import { P41Context } from "@/modules/P41/P41Context";
import { forwardRef, useContext } from "react";
import { useFormContext } from "react-hook-form";
import P41SearchPopper from "./P41SearchPopper";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-components";

const P41SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const p41 = useContext(P41Context);
	const form = useFormContext();

	const formMeta = useFormMeta(
		`
		lvId,
		lvName,
		lvBank,
		`);


	return (
		<FormMetaProvider {...formMeta}>
			<P41SearchPopper
				ref={ref}
				onClose={p41.handlePopperClose}
				onReset={p41.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

P41SearchPopperContainer.displayName = "P41SearchPopperContainer";
export default P41SearchPopperContainer;



