import { PrintReportButton } from "@/components";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { G08Context } from "@/modules/G08/G08Context";

const G08ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const g08 = useContext(G08Context);
	const { canPrint } = g08;

	const handleSubmit = form.handleSubmit(
		g08.onPrintSubmit,
		g08.onPrintSubmitError
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

G08ExportButtonContainer.displayName = "G08ExportButtonContainer";
export default G08ExportButtonContainer;