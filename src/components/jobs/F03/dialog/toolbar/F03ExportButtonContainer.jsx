import { PrintReportButton } from "@/components";
import { F03Context } from "@/contexts/F03/F03Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const F03ExportButtonContainer = (props) => {
	const { ...rest } = props;
	// const form = useFormContext();
	const f03 = useContext(F03Context);
	const { canPrint } = f03;

	// const handleSubmit = form.handleSubmit(
	// 	f03.onPrintSubmit,
	// 	f03.onPrintSubmitError
	// );

	if (!canPrint) {
		return false;
	}

	return (
		<PrintReportButton
			// onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

F03ExportButtonContainer.displayName = "F03ExportButtonContainer";
export default F03ExportButtonContainer;