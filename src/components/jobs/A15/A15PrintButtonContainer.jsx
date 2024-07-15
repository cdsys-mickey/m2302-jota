import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { A15Context } from "@/contexts/A15/A15Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const A15PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a15 = useContext(A15Context);

		if (a15.moduleAuthorityLoading || !a15.canPrint) {
			return false;
		}

		return (
			<ResponsiveButton
				ref={ref}
				color="neutral"
				variant="contained"
				startIcon={<LocalPrintshopIcon />}
				sx={{
					fontWeight: 600,
				}}
				onClick={stdPrint.promptPrint}
				{...rest}>
				列印
			</ResponsiveButton>
		);
	})
);

A15PrintButtonContainer.propTypes = {};

A15PrintButtonContainer.displayName = "A15PrintButtonContainer";
export default A15PrintButtonContainer;
