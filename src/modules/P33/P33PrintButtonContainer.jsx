import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";
import { P33Context } from "./P33Context";

const P33PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const p33 = useContext(P33Context);
		const { moduleAuthorityLoading, canPrint } = p33;

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

P33PrintButtonContainer.propTypes = {};

P33PrintButtonContainer.displayName = "P33PrintButtonContainer";
export default P33PrintButtonContainer;




