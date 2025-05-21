import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { G08Context } from "@/modules/G08/G08Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const G08PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const g08 = useContext(G08Context);
		const { moduleAuthorityLoading, canPrint } = g08;

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

G08PrintButtonContainer.propTypes = {};

G08PrintButtonContainer.displayName = "G08PrintButtonContainer";
export default G08PrintButtonContainer;


