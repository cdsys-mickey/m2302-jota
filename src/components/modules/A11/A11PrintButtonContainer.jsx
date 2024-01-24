import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { A11Context } from "@/contexts/A11/A11Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const A11PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a11 = useContext(A11Context);
		const { moduleAuthorityLoading, canPrint } = a11;

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
				{...rest}>
				列印
			</ResponsiveButton>
		);
	})
);

A11PrintButtonContainer.propTypes = {};

A11PrintButtonContainer.displayName = "A11PrintButtonContainer";
export default A11PrintButtonContainer;
