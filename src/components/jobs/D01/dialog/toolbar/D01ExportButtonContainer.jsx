import { PrintReportButton } from "@/components";
import { D01Context } from "@/contexts/D01/D01Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const D01ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const d01 = useContext(D01Context);
	const { canPrint } = d01;

	const handleSubmit = form.handleSubmit(
		d01.onPrintSubmit,
		d01.onPrintSubmitError
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

D01ExportButtonContainer.displayName = "D01ExportButtonContainer";
export default D01ExportButtonContainer;