import { P34Context } from "@/modules/P34/P34Context";
import { forwardRef, useContext } from "react";
import { useFormContext } from "react-hook-form";
import P34SearchPopper from "./P34SearchPopper";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

const P34SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const p34 = useContext(P34Context);
	const form = useFormContext();

	const formMeta = useFormMeta(
		`
		lvId,
		lvName,
		lvBank,
		`);


	return (
		<FormMetaProvider {...formMeta}>
			<P34SearchPopper
				ref={ref}
				onClose={p34.handlePopperClose}
				onReset={p34.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

P34SearchPopperContainer.displayName = "P34SearchPopperContainer";
export default P34SearchPopperContainer;

