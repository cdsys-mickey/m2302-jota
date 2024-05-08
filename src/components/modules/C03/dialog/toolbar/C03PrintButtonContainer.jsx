import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { C03Context } from "@/contexts/C03/C03Context";
import { useFormContext } from "react-hook-form";

const C03PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const c03 = useContext(C03Context);
		const { canPrint } = c03;

		const handleSubmit = form.handleSubmit(
			c03.onPrintSubmit,
			c03.onPrintSubmitError
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

C03PrintButtonContainer.propTypes = {};

C03PrintButtonContainer.displayName = "C03PrintButtonContainer";
export default C03PrintButtonContainer;
