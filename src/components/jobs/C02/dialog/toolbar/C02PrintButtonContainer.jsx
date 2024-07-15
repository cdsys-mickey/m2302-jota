import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { C02Context } from "@/contexts/C02/C02Context";
import { useFormContext } from "react-hook-form";

const C02PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const c02 = useContext(C02Context);
		const { canPrint } = c02;

		const handleSubmit = form.handleSubmit(
			c02.onPrintSubmit,
			c02.onPrintSubmitError
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

C02PrintButtonContainer.propTypes = {};

C02PrintButtonContainer.displayName = "C02PrintButtonContainer";
export default C02PrintButtonContainer;
