import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { A05Context } from "@/modules/A05/A05Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const A05PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a05 = useContext(A05Context);
		const { moduleAuthorityLoading, canPrint } = a05;

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

A05PrintButtonContainer.propTypes = {};

A05PrintButtonContainer.displayName = "A05PrintButtonContainer";
export default A05PrintButtonContainer;
