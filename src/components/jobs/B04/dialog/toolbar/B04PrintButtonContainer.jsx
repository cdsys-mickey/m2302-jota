import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { B04Context } from "@/contexts/B04/B04Context";
import { useFormContext } from "react-hook-form";

const B04PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const b04 = useContext(B04Context);
		const { canPrint } = b04;

		const handleSubmit = form.handleSubmit(
			b04.onPrintSubmit,
			b04.onPrintSubmitError
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

B04PrintButtonContainer.propTypes = {};

B04PrintButtonContainer.displayName = "B04PrintButtonContainer";
export default B04PrintButtonContainer;



