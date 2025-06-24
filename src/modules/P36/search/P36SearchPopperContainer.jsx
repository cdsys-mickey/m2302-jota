import { P36Context } from "@/modules/P36/P36Context";
import { forwardRef, useContext } from "react";
import { useFormContext } from "react-hook-form";
import P36SearchPopper from "./P36SearchPopper";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

const P36SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const p36 = useContext(P36Context);
	const form = useFormContext();

	const formMeta = useFormMeta(
		`
		lvId,
		lvName,
		lvBank,
		`);


	return (
		<FormMetaProvider {...formMeta}>
			<P36SearchPopper
				ref={ref}
				onClose={p36.handlePopperClose}
				onReset={p36.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

P36SearchPopperContainer.displayName = "P36SearchPopperContainer";
export default P36SearchPopperContainer;



