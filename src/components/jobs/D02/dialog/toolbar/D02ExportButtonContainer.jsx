import { PrintReportButton } from "@/components";
import { D02Context } from "@/contexts/D02/D02Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const D02ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const d02 = useContext(D02Context);
	const { canPrint } = d02;

	const handleSubmit = form.handleSubmit(
		d02.onPrintSubmit,
		d02.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintReportButton
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

D02ExportButtonContainer.displayName = "D02ExportButtonContainer";
export default D02ExportButtonContainer;