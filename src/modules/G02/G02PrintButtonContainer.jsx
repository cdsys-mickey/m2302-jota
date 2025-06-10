import { PrintReportButton } from "@/components";
import { G02Context } from "@/modules/G02/G02Context";
import { forwardRef, memo, useContext } from "react";
import { useFormContext } from "react-hook-form";

const G02PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const g02 = useContext(G02Context);
		const { moduleAuthorityLoading, canPrint } = g02;

		const handlePrint = form.handleSubmit(g02.onPrintSubmit, g02.onPrintSubmitError);

		const handleDebugSubmit = form.handleSubmit(g02.onDebugPrintSubmit);

		if (moduleAuthorityLoading || !canPrint) {
			return false;
		}

		return (
			<PrintReportButton
				ref={ref}
				color="primary"
				variant="contained"
				onSubmit={handlePrint}
				onDebugSubmit={handleDebugSubmit}
				// color="neutral"
				{...rest}
			/>
		);
	}));
G02PrintButtonContainer.propTypes = {};

G02PrintButtonContainer.displayName = "G02PrintButtonContainer";
export default G02PrintButtonContainer;


