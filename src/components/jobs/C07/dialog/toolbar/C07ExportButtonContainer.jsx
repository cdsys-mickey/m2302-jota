import PrintButton from "@/components/print-button/PrintButton";
import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";
import { C07Context } from "@/contexts/C07/C07Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const C07ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const c07 = useContext(C07Context);
	const { canPrint } = c07;

	const handleSubmit = form.handleSubmit(
		c07.onPrintSubmit,
		c07.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintButtonContainer
			// onSelect={c07.handlePrint({ setValue: form.setValue })}
			// onClick={c07.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

C07ExportButtonContainer.displayName = "C07ExportButtonContainer";
export default C07ExportButtonContainer;