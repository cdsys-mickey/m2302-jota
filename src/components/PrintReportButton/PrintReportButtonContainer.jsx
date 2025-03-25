import { useCallback } from "react";
import PrintReportButtonView from "./PrintReportButtonView";
import { useFormContext } from "react-hook-form";

const PrintReportButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const { setValue } = form;

	const onSelect = useCallback((outputType) => {
		console.log("onBeforeSubmit", outputType);
		setValue("outputType", outputType);
	}, [setValue]);

	return <PrintReportButtonView onSelect={onSelect} noGutter {...rest} />
}

PrintReportButtonContainer.displayName = "PrintButtonContainer";
export default PrintReportButtonContainer;