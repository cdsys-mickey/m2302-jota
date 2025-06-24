import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { P21Context } from "@/modules/P21/P21Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const P21PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const p21 = useContext(P21Context);
		const { moduleAuthorityLoading, canPrint } = p21;

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

P21PrintButtonContainer.propTypes = {};

P21PrintButtonContainer.displayName = "P21PrintButtonContainer";
export default P21PrintButtonContainer;


