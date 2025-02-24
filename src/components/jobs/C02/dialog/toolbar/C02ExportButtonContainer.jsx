import PrintButton from "@/components/print-button/PrintButton";
import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";
import { C02Context } from "@/contexts/C02/C02Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const C02ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const c02 = useContext(C02Context);
	const { canPrint } = c02;

	const handleSubmit = form.handleSubmit(
		c02.onPrintSubmit,
		c02.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintButtonContainer
			// onSelect={c02.handlePrint({ setValue: form.setValue })}
			// onClick={c02.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

C02ExportButtonContainer.displayName = "C02ExportButtonContainer";
export default C02ExportButtonContainer;