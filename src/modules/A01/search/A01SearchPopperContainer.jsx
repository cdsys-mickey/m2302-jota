import { A01Context } from "@/modules/A01/A01Context";
import { forwardRef, useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import A01SearchPopper from "./A01SearchPopper";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useCallback } from "react";

const A01SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const a01 = useContext(A01Context);
	const form = useFormContext();

	const formMeta = useFormMeta(
		`
			lvId,
			lvBarcode,
			lvName,
			lvCatL,
			lvCatM,
			lvCatS,
			lvCounter,
			lvCmsType
			`
	);

	const lvCatL = useWatch({
		name: "lvCatL",
		control: form.control
	})

	const lvCatM = useWatch({
		name: "lvCatM",
		control: form.control
	})

	const isFieldDisabled = useCallback(
		(field) => {
			switch (field.name) {
				case "lvCatM":
					return !lvCatL;
				case "lvCatS":
					return !lvCatL || !lvCatM;
				default:
					return false;
			}
		},
		[lvCatL, lvCatM]
	);

	return (
		<FormMetaProvider {...formMeta} isFieldDisabled={isFieldDisabled}>
			<A01SearchPopper
				ref={ref}
				onClose={a01.handlePopperClose}
				onReset={a01.handleReset({ reset: form.reset })}
				// onReset={handleReset}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

A01SearchPopperContainer.displayName = "A01SearchPopperContainer";
export default A01SearchPopperContainer;
