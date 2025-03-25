import { PrintReportButton } from "@/components";
import { C03Context } from "@/contexts/C03/C03Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const C03ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const c03 = useContext(C03Context);
	const { canPrint } = c03;

	const handleSubmit = form.handleSubmit(
		c03.onPrintSubmit,
		c03.onPrintSubmitError
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

C03ExportButtonContainer.displayName = "C03ExportButtonContainer";
export default C03ExportButtonContainer;