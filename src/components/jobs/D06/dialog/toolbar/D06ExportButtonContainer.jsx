import { PrintReportButton } from "@/components";
import { D06Context } from "@/contexts/D06/D06Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const D06ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const d06 = useContext(D06Context);
	const { canPrint } = d06;

	const handleSubmit = form.handleSubmit(
		d06.onPrintSubmit,
		d06.onPrintSubmitError
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

D06ExportButtonContainer.displayName = "D06ExportButtonContainer";
export default D06ExportButtonContainer;