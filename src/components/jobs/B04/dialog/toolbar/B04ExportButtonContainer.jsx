import { PrintReportButton } from "@/components";
import { B04Context } from "@/contexts/B04/B04Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const B04ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const b04 = useContext(B04Context);
	const { canPrint } = b04;

	const handleSubmit = form.handleSubmit(
		b04.onPrintSubmit,
		b04.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintReportButton
			// onSelect={b04.handlePrint({ setValue: form.setValue })}
			// onClick={b04.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

B04ExportButtonContainer.displayName = "B04ExportButtonContainer";
export default B04ExportButtonContainer;