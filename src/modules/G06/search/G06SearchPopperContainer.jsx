import { G06Context } from "@/modules/G06/G06Context";
import { forwardRef, useContext } from "react";
import { useFormContext } from "react-hook-form";
import G06SearchPopper from "./G06SearchPopper";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

const G06SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const g06 = useContext(G06Context);
	const form = useFormContext();

	const formMeta = useFormMeta(
		`
		lvId,
		lvName,
		lvBank,
		`);


	return (
		<FormMetaProvider {...formMeta}>
			<G06SearchPopper
				ref={ref}
				onClose={g06.handlePopperClose}
				onReset={g06.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

G06SearchPopperContainer.displayName = "G06SearchPopperContainer";
export default G06SearchPopperContainer;

