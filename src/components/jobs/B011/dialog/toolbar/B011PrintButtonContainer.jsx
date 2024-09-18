import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { B011Context } from "@/contexts/B011/B011Context";
import { useFormContext } from "react-hook-form";

const B011PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const b011 = useContext(B011Context);
		const { canPrint } = b011;

		const handleSubmit = form.handleSubmit(
			b011.onPrintSubmit,
			b011.onPrintSubmitError
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

B011PrintButtonContainer.propTypes = {};

B011PrintButtonContainer.displayName = "B011PrintButtonContainer";
export default B011PrintButtonContainer;

