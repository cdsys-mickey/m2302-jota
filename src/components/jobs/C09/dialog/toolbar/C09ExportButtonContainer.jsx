import { PrintReportButton } from "@/components";
import { C09Context } from "@/contexts/C09/C09Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const C09ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const c09 = useContext(C09Context);
	const { canPrint } = c09;

	const handleSubmit = form.handleSubmit(
		c09.onPrintSubmit,
		c09.onPrintSubmitError
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

C09ExportButtonContainer.displayName = "C09ExportButtonContainer";
export default C09ExportButtonContainer;