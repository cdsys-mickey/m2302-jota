import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { A02Context } from "@/contexts/A02/A02Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const A02PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a02 = useContext(A02Context);
		const { moduleAuthorityLoading, canPrint } = a02;

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

A02PrintButtonContainer.propTypes = {};

A02PrintButtonContainer.displayName = "A02PrintButtonContainer";
export default A02PrintButtonContainer;
