import PrintButton from "@/components/print-button/PrintButton";
import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";
import { B06Context } from "@/contexts/B06/B06Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const B06ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const b06 = useContext(B06Context);
	const { canPrint } = b06;

	const handleSubmit = form.handleSubmit(
		b06.onPrintSubmit,
		b06.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintButtonContainer
			// onSelect={b06.handlePrint({ setValue: form.setValue })}
			// onClick={b06.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

B06ExportButtonContainer.displayName = "B06ExportButtonContainer";
export default B06ExportButtonContainer;