import { PrintReportButton } from "@/components";
import { D041Context } from "@/contexts/D041/D041Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const D041ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const d041 = useContext(D041Context);
	const { canPrint } = d041;

	const handleSubmit = form.handleSubmit(
		d041.onPrintSubmit,
		d041.onPrintSubmitError
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

D041ExportButtonContainer.displayName = "D041ExportButtonContainer";
export default D041ExportButtonContainer;