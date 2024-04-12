import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { A16Context } from "@/contexts/A16/A16Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const A16PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a16 = useContext(A16Context);

		if (a16.moduleAuthorityLoading || !a16.canPrint) {
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

A16PrintButtonContainer.propTypes = {};

A16PrintButtonContainer.displayName = "A16PrintButtonContainer";
export default A16PrintButtonContainer;
