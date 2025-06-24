import { P35Context } from "@/modules/P35/P35Context";
import { forwardRef, useContext } from "react";
import { useFormContext } from "react-hook-form";
import P35SearchPopper from "./P35SearchPopper";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

const P35SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const p35 = useContext(P35Context);
	const form = useFormContext();

	const formMeta = useFormMeta(
		`
		lvId,
		lvName,
		lvBank,
		`);


	return (
		<FormMetaProvider {...formMeta}>
			<P35SearchPopper
				ref={ref}
				onClose={p35.handlePopperClose}
				onReset={p35.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

P35SearchPopperContainer.displayName = "P35SearchPopperContainer";
export default P35SearchPopperContainer;


