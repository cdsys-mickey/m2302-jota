import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { P36Context } from "@/modules/P36/P36Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const P36PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const p36 = useContext(P36Context);
		const { moduleAuthorityLoading, canPrint } = p36;

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

P36PrintButtonContainer.propTypes = {};

P36PrintButtonContainer.displayName = "P36PrintButtonContainer";
export default P36PrintButtonContainer;



