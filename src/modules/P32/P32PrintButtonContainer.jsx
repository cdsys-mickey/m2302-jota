import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";
import { P32Context } from "./P32Context";

const P32PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const stdPrint = useContext(StdPrintContext);
		const p32 = useContext(P32Context);
		const { moduleAuthorityLoading, canPrint } = p32;

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

P32PrintButtonContainer.propTypes = {};

P32PrintButtonContainer.displayName = "P32PrintButtonContainer";
export default P32PrintButtonContainer;



