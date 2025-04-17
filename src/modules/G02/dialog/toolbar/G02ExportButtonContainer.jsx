import { PrintReportButton } from "@/components";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { G02Context } from "@/modules/G02/G02Context";

const G02ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const g02 = useContext(G02Context);
	const { canPrint } = g02;

	const handleSubmit = form.handleSubmit(
		g02.onPrintSubmit,
		g02.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintReportButton
			// onSelect={g02.handlePrint({ setValue: form.setValue })}
			// onClick={g02.handlePrint({ setValue: form.setValue })}
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

G02ExportButtonContainer.displayName = "G02ExportButtonContainer";
export default G02ExportButtonContainer;
