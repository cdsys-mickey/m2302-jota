import { memo } from "react";
import { PrintReportButton } from "@/components";
import StdPrint from "@/modules/StdPrint.mjs";

export const ExportTxtButtonView = memo((props) => {
	const { ...rest } = props;
	return (
		<PrintReportButton
			color="primary"
			variant="contained"
			options={StdPrint.optionsForTxt}
			getItemIconComponent={StdPrint.getIconForTxt}
			{...rest}
		/>
	);
})

ExportTxtButtonView.propTypes = {

}
ExportTxtButtonView.displayName = "A22ExportTxtButton";