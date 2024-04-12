import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { A26Context } from "@/contexts/A26/A26Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const A26PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a26 = useContext(A26Context);

		if (a26.moduleAuthorityLoading || !a26.canPrint) {
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

A26PrintButtonContainer.propTypes = {};

A26PrintButtonContainer.displayName = "A26PrintButtonContainer";
export default A26PrintButtonContainer;
