import PrintButton from "@/components/print-button/PrintButton";
import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";
import { C05Context } from "@/contexts/C05/C05Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const C05ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const c05 = useContext(C05Context);
	const { canPrint } = c05;

	const handleSubmit = form.handleSubmit(
		c05.onPrintSubmit,
		c05.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintButtonContainer
			// onSelect={c05.handlePrint({ setValue: form.setValue })}
			// onClick={c05.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

C05ExportButtonContainer.displayName = "C05ExportButtonContainer";
export default C05ExportButtonContainer;