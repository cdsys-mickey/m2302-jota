import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { A20Context } from "@/contexts/A20/A20Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const A20PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a20 = useContext(A20Context);

		if (a20.moduleAuthorityLoading || !a20.canPrint) {
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

A20PrintButtonContainer.propTypes = {};

A20PrintButtonContainer.displayName = "A20PrintButtonContainer";
export default A20PrintButtonContainer;
