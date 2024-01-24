import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { A08Context } from "@/contexts/A08/A08Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const A08PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a08 = useContext(A08Context);
		const { moduleAuthorityLoading, canPrint } = a08;

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

A08PrintButtonContainer.propTypes = {};

A08PrintButtonContainer.displayName = "A08PrintButtonContainer";
export default A08PrintButtonContainer;
