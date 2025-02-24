import { useCallback } from "react";
import PrintButton from "./PrintButton";
import { useFormContext } from "react-hook-form";

const PrintButtonContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const { setValue } = form;

	const onSelect = useCallback((outputType) => {
		console.log("onBeforeSubmit", outputType);
		setValue("outputType", outputType);
	}, [setValue]);

	return <PrintButton onSelect={onSelect} noGutter {...rest} />
}

PrintButtonContainer.displayName = "PrintButtonContainer";
export default PrintButtonContainer;