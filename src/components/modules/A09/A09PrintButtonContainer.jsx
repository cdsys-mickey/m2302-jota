import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { A09Context } from "@/contexts/A09/A09Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const A09PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a09 = useContext(A09Context);

		if (a09.moduleAuthorityLoading || !a09.canPrint) {
			return false;
		}

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<LocalPrintshopIcon />}
				sx={{
					fontWeight: 600,
				}}
				onClick={stdPrint.promptPrint}
				color="neutral"
				{...rest}>
				列印
			</ResponsiveButton>
		);
	})
);

A09PrintButtonContainer.propTypes = {};

A09PrintButtonContainer.displayName = "A09PrintButtonContainer";
export default A09PrintButtonContainer;
