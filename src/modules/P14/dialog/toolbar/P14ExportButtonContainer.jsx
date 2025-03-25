import { PrintReportButton } from "@/components";
import { P14Context } from "@/modules/P14/P14Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const P14ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const p14 = useContext(P14Context);
	const { canPrint } = p14;

	const handleSubmit = form.handleSubmit(
		p14.onPrintSubmit,
		p14.onPrintSubmitError
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

P14ExportButtonContainer.displayName = "P14ExportButtonContainer";
export default P14ExportButtonContainer;
