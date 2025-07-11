import { C05Context } from "@/contexts/C05/C05Context";
import { forwardRef, useContext } from "react";
import C05SearchPopper from "./C05SearchPopper";
import { useFormContext } from "react-hook-form";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-components";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

const C05SearchPopperContainer = forwardRef(({ ...rest }, ref) => {
	const c05 = useContext(C05Context);
	const form = useFormContext();

	const formMeta = useFormMeta(
		`
		supplier,
		spn,
		spa,
		spu,
		inv,
		taxType,
		rd,
		employee
		`
	)

	useChangeTracking(() => {
		if (c05.popperOpen) {
			// form.reset()
			console.log("popper opened");
		}
	}, [c05.popperOpen]);

	return (
		<FormMetaProvider {...formMeta}>
			<C05SearchPopper
				ref={ref}
				onClose={c05.handlePopperClose}
				onReset={c05.handleReset({ reset: form.reset })}
				{...rest}
			/>
		</FormMetaProvider>
	);
});

C05SearchPopperContainer.displayName = "C05SearchPopperContainer";
export default C05SearchPopperContainer;
