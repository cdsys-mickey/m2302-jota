import { P21Context } from "@/modules/P21/P21Context";
import { forwardRef, useContext } from "react";
import { useFormContext } from "react-hook-form";
import P21SearchPopper from "./P21SearchPopper";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

const P21SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const p21 = useContext(P21Context);
	const form = useFormContext();

	const formMeta = useFormMeta(
		`
		lvId,
		lvName,
		lvBank,
		`);


	return (
		<FormMetaProvider {...formMeta}>
			<P21SearchPopper
				ref={ref}
				onClose={p21.handlePopperClose}
				onReset={p21.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

P21SearchPopperContainer.displayName = "P21SearchPopperContainer";
export default P21SearchPopperContainer;


