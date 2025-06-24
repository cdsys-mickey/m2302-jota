import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";
import { P31Context } from "./P31Context";

const P31PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const p31 = useContext(P31Context);
		const { moduleAuthorityLoading, canPrint } = p31;

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

P31PrintButtonContainer.propTypes = {};

P31PrintButtonContainer.displayName = "P31PrintButtonContainer";
export default P31PrintButtonContainer;


