import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { A03Context } from "@/contexts/A03/A03Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const A03PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a03 = useContext(A03Context);
		const { moduleAuthorityLoading, canPrint } = a03;

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

A03PrintButtonContainer.propTypes = {};

A03PrintButtonContainer.displayName = "A03PrintButtonContainer";
export default A03PrintButtonContainer;
