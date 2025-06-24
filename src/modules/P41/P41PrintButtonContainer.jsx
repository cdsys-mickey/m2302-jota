import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { P41Context } from "@/modules/P41/P41Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const P41PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const p41 = useContext(P41Context);
		const { moduleAuthorityLoading, canPrint } = p41;

		if (moduleAuthorityLoading || !canPrint) {
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

P41PrintButtonContainer.propTypes = {};

P41PrintButtonContainer.displayName = "P41PrintButtonContainer";
export default P41PrintButtonContainer;



