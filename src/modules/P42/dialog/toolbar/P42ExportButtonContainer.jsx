import { PrintReportButton } from "@/components";
import { P42Context } from "@/modules/P42/P42Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const P42ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const p42 = useContext(P42Context);
	const { canPrint } = p42;

	const handleSubmit = form.handleSubmit(
		p42.onPrintSubmit,
		p42.onPrintSubmitError
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

P42ExportButtonContainer.displayName = "P42ExportButtonContainer";
export default P42ExportButtonContainer;