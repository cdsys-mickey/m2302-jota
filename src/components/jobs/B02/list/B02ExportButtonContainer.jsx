import { PrintReportButton } from "@/components";
import { BContext } from "@/contexts/B/BContext";
import { B02Context } from "@/contexts/B02/B02Context";
import { B04Context } from "@/contexts/B04/B04Context";
import { useMemo } from "react";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const B02ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const b = useContext(BContext);
	const b02 = useContext(b.forNew ? B04Context : B02Context);
	const { canPrint } = b02;

	const handleSubmit = form.handleSubmit(
		b02.onPrintSubmit,
		b02.onPrintSubmitError
	);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			b02.onDebugSubmit,
		)
	}, [b02.onDebugSubmit, form]);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintReportButton
			onSubmit={handleSubmit}
			onDebugSubmit={onDebugSubmit}
			{...rest}
		/>
	)
}

B02ExportButtonContainer.displayName = "B02ExportButtonContainer";
export default B02ExportButtonContainer;