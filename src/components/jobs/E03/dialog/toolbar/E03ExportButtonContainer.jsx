import { PrintReportButton } from "@/components";
import { E03Context } from "@/contexts/E03/E03Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const E03ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const e03 = useContext(E03Context);
	const { canPrint } = e03;

	const handleSubmit = form.handleSubmit(
		e03.onPrintSubmit,
		e03.onPrintSubmitError
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

E03ExportButtonContainer.displayName = "E03ExportButtonContainer";
export default E03ExportButtonContainer;