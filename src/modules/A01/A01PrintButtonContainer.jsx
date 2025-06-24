import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { A01Context } from "@/modules/A01/A01Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";
import { ButtonEx } from "@/shared-components";

const A01PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const a01 = useContext(A01Context);
		const { moduleAuthorityLoading, canPrint } = a01;

		if (
			moduleAuthorityLoading ||
			// a01.mode === A01.Mode.NEW_PROD ||
			!canPrint
		) {
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
				{...rest}>
				列印
			</ButtonEx>
		);
	})
);

A01PrintButtonContainer.propTypes = {};

A01PrintButtonContainer.displayName = "A01PrintButtonContainer";
export default A01PrintButtonContainer;
