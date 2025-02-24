import PrintButton from "@/components/print-button/PrintButton";
import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";
import { C08Context } from "@/contexts/C08/C08Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const C08ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const c08 = useContext(C08Context);
	const { canPrint } = c08;

	const handleSubmit = form.handleSubmit(
		c08.onPrintSubmit,
		c08.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintButtonContainer
			// onSelect={c08.handlePrint({ setValue: form.setValue })}
			// onClick={c08.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

C08ExportButtonContainer.displayName = "C08ExportButtonContainer";
export default C08ExportButtonContainer;