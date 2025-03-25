import { PrintReportButton } from "@/components";
import { BContext } from "@/contexts/B/BContext";
import { B012Context } from "@/contexts/B012/B012Context";
import { B032Context } from "@/contexts/B032/B032Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const B012ExportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const b = useContext(BContext);
	const b012 = useContext(b.forNew ? B032Context : B012Context);
	const { canPrint } = b012;

	const handleSubmit = form.handleSubmit(
		b012.onPrintSubmit,
		b012.onPrintSubmitError
	);

	if (!canPrint) {
		return false;
	}

	return (
		<PrintReportButton
			onSubmit={handleSubmit}
			{...rest}
		/>
	)
}

B012ExportButtonContainer.displayName = "B012ExportButtonContainer";
export default B012ExportButtonContainer;