import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { B06Context } from "@/contexts/B06/B06Context";
import { useFormContext } from "react-hook-form";

const B06PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const b06 = useContext(B06Context);
		const { canPrint } = b06;

		const handleSubmit = form.handleSubmit(
			b06.onPrintSubmit,
			b06.onPrintSubmitError
		);

		if (!canPrint) {
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
				onClick={handleSubmit}
				color="neutral"
				{...rest}>
				列印
			</ResponsiveButton>
		);
	})
);

B06PrintButtonContainer.propTypes = {};

B06PrintButtonContainer.displayName = "B06PrintButtonContainer";
export default B06PrintButtonContainer;
