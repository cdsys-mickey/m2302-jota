import PrintButton from "@/components/print-button/PrintButton";
import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";
import { F01Context } from "@/contexts/F01/F01Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const F01ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const f01 = useContext(F01Context);
	const { canPrint } = f01;

	const handleSubmit = form.handleSubmit(
		f01.onPrintSubmit,
		f01.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintButtonContainer
			// onSelect={f01.handlePrint({ setValue: form.setValue })}
			// onClick={f01.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

F01ExportButtonContainer.displayName = "F01ExportButtonContainer";
export default F01ExportButtonContainer;