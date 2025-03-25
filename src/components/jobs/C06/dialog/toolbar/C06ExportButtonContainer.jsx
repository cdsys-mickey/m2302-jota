import { PrintReportButton } from "@/components";
import { C06Context } from "@/contexts/C06/C06Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const C06ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const c06 = useContext(C06Context);
	const { canPrint } = c06;

	const handleSubmit = form.handleSubmit(
		c06.onPrintSubmit,
		c06.onPrintSubmitError
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

C06ExportButtonContainer.displayName = "C06ExportButtonContainer";
export default C06ExportButtonContainer;