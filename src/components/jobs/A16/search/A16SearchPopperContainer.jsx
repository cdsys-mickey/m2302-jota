import { A16Context } from "@/contexts/A16/A16Context";
import { forwardRef, useContext } from "react";
import { useFormContext } from "react-hook-form";
import A16SearchPopper from "./A16SearchPopper";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

const A16SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const a16 = useContext(A16Context);
	const form = useFormContext();

	const formMeta = useFormMeta(
		`
		lvId,
		lvName,
		lvBank,
		`);


	return (
		<FormMetaProvider {...formMeta}>
			<A16SearchPopper
				ref={ref}
				onClose={a16.handlePopperClose}
				onReset={a16.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

A16SearchPopperContainer.displayName = "A16SearchPopperContainer";
export default A16SearchPopperContainer;

