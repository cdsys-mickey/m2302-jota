import { PrintReportButton } from "@/components";
import { F01Context } from "@/modules/F01/F01Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const F01ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const f01 = useContext(F01Context);
	const { canPrint } = f01;

	const handleSubmit = form.handleSubmit(
		f01.onPrintSubmit,
		f01.onPrintSubmitError
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

F01ExportButtonContainer.displayName = "F01ExportButtonContainer";
export default F01ExportButtonContainer;