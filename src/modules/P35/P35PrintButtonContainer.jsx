import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";
import { P35Context } from "@/modules/P35/P35Context";
import { ButtonEx } from "@/shared-components";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";

const P35PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const p35 = useContext(P35Context);
		const { moduleAuthorityLoading, canPrint } = p35;

		if (moduleAuthorityLoading || !canPrint) {
			return false;
		}

		return (
			<ButtonEx
				responsive
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
			</ButtonEx>
		);
	})
);

P35PrintButtonContainer.propTypes = {};

P35PrintButtonContainer.displayName = "P35PrintButtonContainer";
export default P35PrintButtonContainer;


