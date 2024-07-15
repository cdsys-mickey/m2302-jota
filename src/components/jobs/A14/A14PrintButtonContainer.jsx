import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { A14Context } from "@/contexts/A14/A14Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const A14PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a14 = useContext(A14Context);

		if (a14.moduleAuthorityLoading || !a14.canPrint) {
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

A14PrintButtonContainer.propTypes = {};

A14PrintButtonContainer.displayName = "A14PrintButtonContainer";
export default A14PrintButtonContainer;
