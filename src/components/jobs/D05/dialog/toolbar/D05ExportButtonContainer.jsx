import { PrintReportButton } from "@/components";
import { D05Context } from "@/contexts/D05/D05Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const D05ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const d05 = useContext(D05Context);
	const { canPrint } = d05;

	const handleSubmit = form.handleSubmit(
		d05.onPrintSubmit,
		d05.onPrintSubmitError
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

D05ExportButtonContainer.displayName = "D05ExportButtonContainer";
export default D05ExportButtonContainer;