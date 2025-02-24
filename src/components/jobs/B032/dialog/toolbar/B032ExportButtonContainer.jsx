import PrintButton from "@/components/print-button/PrintButton";
import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";
import { B032Context } from "@/contexts/B032/B032Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const B032ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const b032 = useContext(B032Context);
	const { canPrint } = b032;

	const handleSubmit = form.handleSubmit(
		b032.onPrintSubmit,
		b032.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintButtonContainer
			// onSelect={b032.handlePrint({ setValue: form.setValue })}
			// onClick={b032.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

B032ExportButtonContainer.displayName = "B032ExportButtonContainer";
export default B032ExportButtonContainer;