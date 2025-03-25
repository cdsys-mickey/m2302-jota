import { PrintReportButton } from "@/components";
import { A01Context } from "@/contexts/A01/A01Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const A01ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const a01 = useContext(A01Context);
	const { canPrint } = a01;

	const handleSubmit = form.handleSubmit(
		a01.onPrintSubmit,
		a01.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintReportButton
			// onSelect={a01.handlePrint({ setValue: form.setValue })}
			// onClick={a01.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

A01ExportButtonContainer.displayName = "A01ExportButtonContainer";
export default A01ExportButtonContainer;