import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { P42Context } from "@/modules/P42/P42Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const P42PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const p42 = useContext(P42Context);
		const { moduleAuthorityLoading, canPrint } = p42;

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

P42PrintButtonContainer.propTypes = {};

P42PrintButtonContainer.displayName = "P42PrintButtonContainer";
export default P42PrintButtonContainer;



