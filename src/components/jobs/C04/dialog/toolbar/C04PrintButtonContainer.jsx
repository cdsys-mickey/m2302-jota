import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { C04Context } from "@/contexts/C04/C04Context";
import { useFormContext } from "react-hook-form";

const C04PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const c04 = useContext(C04Context);
		const { canPrint } = c04;

		const handleSubmit = form.handleSubmit(
			c04.onPrintSubmit,
			c04.onPrintSubmitError
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

C04PrintButtonContainer.propTypes = {};

C04PrintButtonContainer.displayName = "C04PrintButtonContainer";
export default C04PrintButtonContainer;
