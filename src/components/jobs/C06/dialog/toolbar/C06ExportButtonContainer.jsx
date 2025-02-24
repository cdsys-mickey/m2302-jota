import PrintButton from "@/components/print-button/PrintButton";
import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";
import { C06Context } from "@/contexts/C06/C06Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const C06ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const c06 = useContext(C06Context);
	const { canPrint } = c06;

	const handleSubmit = form.handleSubmit(
		c06.onPrintSubmit,
		c06.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintButtonContainer
			// onSelect={c06.handlePrint({ setValue: form.setValue })}
			// onClick={c06.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

C06ExportButtonContainer.displayName = "C06ExportButtonContainer";
export default C06ExportButtonContainer;