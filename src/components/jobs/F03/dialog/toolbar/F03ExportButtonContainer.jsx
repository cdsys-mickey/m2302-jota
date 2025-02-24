import PrintButton from "@/components/print-button/PrintButton";
import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";
import { F03Context } from "@/contexts/F03/F03Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const F03ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const f03 = useContext(F03Context);
	const { canPrint } = f03;

	const handleSubmit = form.handleSubmit(
		f03.onPrintSubmit,
		f03.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintButtonContainer
			// onSelect={f03.handlePrint({ setValue: form.setValue })}
			// onClick={f03.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

F03ExportButtonContainer.displayName = "F03ExportButtonContainer";
export default F03ExportButtonContainer;