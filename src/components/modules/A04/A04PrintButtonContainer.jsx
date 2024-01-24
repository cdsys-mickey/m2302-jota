import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { A04Context } from "@/contexts/A04/A04Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const A04PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a04 = useContext(A04Context);
		const { moduleAuthorityLoading, canPrint } = a04;

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

A04PrintButtonContainer.propTypes = {};

A04PrintButtonContainer.displayName = "A04PrintButtonContainer";
export default A04PrintButtonContainer;
