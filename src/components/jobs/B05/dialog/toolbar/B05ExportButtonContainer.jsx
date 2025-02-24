import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";
import { B05Context } from "@/contexts/B05/B05Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const B05ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const b05 = useContext(B05Context);
	const { canPrint } = b05;

	const handleSubmit = form.handleSubmit(
		b05.onPrintSubmit,
		b05.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintButtonContainer
			// onSelect={b05.handlePrint({ setValue: form.setValue })}
			// onClick={b05.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

B05ExportButtonContainer.displayName = "B05ExportButtonContainer";
export default B05ExportButtonContainer;