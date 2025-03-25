import { PrintReportButton } from "@/components";
import { C08Context } from "@/contexts/C08/C08Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const C08ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const c08 = useContext(C08Context);
	const { canPrint } = c08;

	const handleSubmit = form.handleSubmit(
		c08.onPrintSubmit,
		c08.onPrintSubmitError
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

C08ExportButtonContainer.displayName = "C08ExportButtonContainer";
export default C08ExportButtonContainer;