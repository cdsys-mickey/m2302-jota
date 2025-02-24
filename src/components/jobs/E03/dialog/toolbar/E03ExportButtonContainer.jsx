import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";
import { E03Context } from "@/contexts/E03/E03Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const E03ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const e03 = useContext(E03Context);
	const { canPrint } = e03;

	const handleSubmit = form.handleSubmit(
		e03.onPrintSubmit,
		e03.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintButtonContainer
			// onSelect={e03.handlePrint({ setValue: form.setValue })}
			// onClick={e03.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

E03ExportButtonContainer.displayName = "E03ExportButtonContainer";
export default E03ExportButtonContainer;