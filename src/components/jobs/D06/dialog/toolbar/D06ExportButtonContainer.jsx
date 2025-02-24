import PrintButton from "@/components/print-button/PrintButton";
import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";
import { D06Context } from "@/contexts/D06/D06Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const D06ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const d06 = useContext(D06Context);
	const { canPrint } = d06;

	const handleSubmit = form.handleSubmit(
		d06.onPrintSubmit,
		d06.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintButtonContainer
			// onSelect={d06.handlePrint({ setValue: form.setValue })}
			// onClick={d06.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

D06ExportButtonContainer.displayName = "D06ExportButtonContainer";
export default D06ExportButtonContainer;