import { PrintReportButton } from "@/components";
import { E01Context } from "@/contexts/E01/E01Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const E01ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const e01 = useContext(E01Context);
	const { canPrint } = e01;

	const handleSubmit = form.handleSubmit(
		e01.onPrintSubmit,
		e01.onPrintSubmitError
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

E01ExportButtonContainer.displayName = "E01ExportButtonContainer";
export default E01ExportButtonContainer;