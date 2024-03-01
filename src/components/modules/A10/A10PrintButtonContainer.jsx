import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { A10Context } from "@/contexts/A10/A10Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const A10PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a10 = useContext(A10Context);

		if (a10.moduleAuthorityLoading || !a10.canPrint) {
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

A10PrintButtonContainer.propTypes = {};

A10PrintButtonContainer.displayName = "A10PrintButtonContainer";
export default A10PrintButtonContainer;
