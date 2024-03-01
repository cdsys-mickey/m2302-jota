import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { A13Context } from "@/contexts/A13/A13Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const A13PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a13 = useContext(A13Context);

		if (a13.moduleAuthorityLoading || !a13.canPrint) {
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

A13PrintButtonContainer.propTypes = {};

A13PrintButtonContainer.displayName = "A13PrintButtonContainer";
export default A13PrintButtonContainer;
