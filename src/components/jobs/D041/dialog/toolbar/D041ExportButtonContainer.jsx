import PrintButton from "@/components/print-button/PrintButton";
import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";
import { D041Context } from "@/contexts/D041/D041Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const D041ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const d041 = useContext(D041Context);
	const { canPrint } = d041;

	const handleSubmit = form.handleSubmit(
		d041.onPrintSubmit,
		d041.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintButtonContainer
			// onSelect={d041.handlePrint({ setValue: form.setValue })}
			// onClick={d041.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

D041ExportButtonContainer.displayName = "D041ExportButtonContainer";
export default D041ExportButtonContainer;