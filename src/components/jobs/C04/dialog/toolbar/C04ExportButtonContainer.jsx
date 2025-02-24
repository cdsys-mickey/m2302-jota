import PrintButton from "@/components/print-button/PrintButton";
import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";
import { C04Context } from "@/contexts/C04/C04Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const C04ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const c04 = useContext(C04Context);
	const { canPrint } = c04;

	const handleSubmit = form.handleSubmit(
		c04.onPrintSubmit,
		c04.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintButtonContainer
			// onSelect={c04.handlePrint({ setValue: form.setValue })}
			// onClick={c04.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

C04ExportButtonContainer.displayName = "C04ExportButtonContainer";
export default C04ExportButtonContainer;