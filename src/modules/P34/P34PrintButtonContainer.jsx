import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { P34Context } from "@/modules/P34/P34Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const P34PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const p34 = useContext(P34Context);
		const { moduleAuthorityLoading, canPrint } = p34;

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

P34PrintButtonContainer.propTypes = {};

P34PrintButtonContainer.displayName = "P34PrintButtonContainer";
export default P34PrintButtonContainer;

