import { G08Context } from "@/modules/G08/G08Context";
import { forwardRef, useContext } from "react";
import { useFormContext } from "react-hook-form";
import G08SearchPopper from "./G08SearchPopper";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-components";

const G08SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const g08 = useContext(G08Context);
	const form = useFormContext();

	const formMeta = useFormMeta(
		`
		lvId,
		lvName,
		lvBank,
		`);


	return (
		<FormMetaProvider {...formMeta}>
			<G08SearchPopper
				ref={ref}
				onClose={g08.handlePopperClose}
				onReset={g08.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

G08SearchPopperContainer.displayName = "G08SearchPopperContainer";
export default G08SearchPopperContainer;


