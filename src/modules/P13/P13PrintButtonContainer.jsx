import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";
import { P13Context } from "./P13Context";

const P13PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const p13 = useContext(P13Context);
		const { moduleAuthorityLoading, canPrint } = p13;

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

P13PrintButtonContainer.propTypes = {};

P13PrintButtonContainer.displayName = "P13PrintButtonContainer";
export default P13PrintButtonContainer;

