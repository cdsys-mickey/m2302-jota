import { useCallback } from "react";
import PrintReportButtonView from "./PrintReportButtonView";
import { useFormContext } from "react-hook-form";
import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";

const PrintReportButtonContainer = (props) => {
	const { htmlOnly, asTxt, ...rest } = props;
	const form = useFormContext();
	const { setValue } = form;

	const onSelect = useCallback((outputType) => {
		console.log("onBeforeSubmit", outputType);
		setValue("outputType", outputType);
	}, [setValue]);

	return (
		<PrintReportButtonView
			onSelect={onSelect}
			noGutter
			{...(htmlOnly && { options: StdPrint.optionsHTMLOnly })}
			{...(asTxt && { options: StdPrint.optionsForTxt })}
			{...rest} />
	)
}

PrintReportButtonContainer.displayName = "PrintReportButtonContainer";
PrintReportButtonContainer.propTypes = {
	htmlOnly: PropTypes.bool,
	asTxt: PropTypes.bool,
}
export default PrintReportButtonContainer;