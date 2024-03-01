import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { A12Context } from "@/contexts/A12/A12Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const A12PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a12 = useContext(A12Context);

		if (a12.moduleAuthorityLoading || !a12.canPrint) {
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

A12PrintButtonContainer.propTypes = {};

A12PrintButtonContainer.displayName = "A12PrintButtonContainer";
export default A12PrintButtonContainer;
