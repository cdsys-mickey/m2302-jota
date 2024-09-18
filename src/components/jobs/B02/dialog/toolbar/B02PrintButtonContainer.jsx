import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { B02Context } from "@/contexts/B02/B02Context";
import { useFormContext } from "react-hook-form";

const B02PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const b02 = useContext(B02Context);
		const { canPrint } = b02;

		const handleSubmit = form.handleSubmit(
			b02.onPrintSubmit,
			b02.onPrintSubmitError
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

B02PrintButtonContainer.propTypes = {};

B02PrintButtonContainer.displayName = "B02PrintButtonContainer";
export default B02PrintButtonContainer;


