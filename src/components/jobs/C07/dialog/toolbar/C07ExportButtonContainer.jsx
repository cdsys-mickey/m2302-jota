import { PrintReportButton } from "@/components";
import { C07Context } from "@/contexts/C07/C07Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const C07ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const c07 = useContext(C07Context);
	const { canPrint } = c07;

	const handleSubmit = form.handleSubmit(
		c07.onPrintSubmit,
		c07.onPrintSubmitError
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

C07ExportButtonContainer.displayName = "C07ExportButtonContainer";
export default C07ExportButtonContainer;