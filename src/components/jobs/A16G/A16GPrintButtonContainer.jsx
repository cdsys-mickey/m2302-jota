import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { A16GContext } from "@/contexts/A16G/A16GContext";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";

const A16GPrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a16g = useContext(A16GContext);

		if (a16g.moduleAuthorityLoading || !a16g.canPrint) {
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

A16GPrintButtonContainer.propTypes = {};

A16GPrintButtonContainer.displayName = "A16GPrintButtonContainer";
export default A16GPrintButtonContainer;

