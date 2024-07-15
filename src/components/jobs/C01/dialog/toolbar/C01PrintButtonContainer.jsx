import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { C01Context } from "@/contexts/C01/C01Context";
import { useFormContext } from "react-hook-form";

const C01PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const c01 = useContext(C01Context);
		const { canPrint } = c01;

		const handleSubmit = form.handleSubmit(
			c01.onPrintSubmit,
			c01.onPrintSubmitError
		);

		if (!canPrint) {
			return false;
		}

		return (
			<ResponsiveButton
				ref={ref}
				// variant="contained"
				startIcon={<LocalPrintshopIcon />}
				sx={{
					fontWeight: 600,
				}}
				onClick={handleSubmit}
				color="neutral"
				{...rest}>
				列印
			</ResponsiveButton>
		);
	})
);

C01PrintButtonContainer.propTypes = {};

C01PrintButtonContainer.displayName = "C01PrintButtonContainer";
export default C01PrintButtonContainer;
