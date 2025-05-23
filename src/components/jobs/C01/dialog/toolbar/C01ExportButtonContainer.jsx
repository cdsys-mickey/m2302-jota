import { PrintReportButton } from "@/components";
import { C01Context } from "@/contexts/C01/C01Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const C01ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const c01 = useContext(C01Context);
	const { canPrint } = c01;

	const handleSubmit = form.handleSubmit(
		c01.onPrintSubmit,
		c01.onPrintSubmitError
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

C01ExportButtonContainer.displayName = "C01ExportButtonContainer";
export default C01ExportButtonContainer;