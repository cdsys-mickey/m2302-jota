import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";
import { E021Context } from "@/modules/E021/E021Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const E021ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const e021 = useContext(E021Context);
	const { canPrint } = e021;

	const handleSubmit = form.handleSubmit(
		e021.onPrintSubmit,
		e021.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintButtonContainer
			// onSelect={e021.handlePrint({ setValue: form.setValue })}
			// onClick={e021.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

E021ExportButtonContainer.displayName = "E021ExportButtonContainer";
export default E021ExportButtonContainer;