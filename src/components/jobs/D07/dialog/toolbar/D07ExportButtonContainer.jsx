import PrintButton from "@/components/print-button/PrintButton";
import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";
import { D07Context } from "@/contexts/D07/D07Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const D07ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const d07 = useContext(D07Context);
	const { canPrint } = d07;

	const handleSubmit = form.handleSubmit(
		d07.onPrintSubmit,
		d07.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintButtonContainer
			// onSelect={d07.handlePrint({ setValue: form.setValue })}
			// onClick={d07.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

D07ExportButtonContainer.displayName = "D07ExportButtonContainer";
export default D07ExportButtonContainer;