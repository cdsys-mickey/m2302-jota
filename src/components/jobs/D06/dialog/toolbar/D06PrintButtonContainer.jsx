import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { D06Context } from "@/contexts/D06/D06Context";
import { useFormContext } from "react-hook-form";

const D06PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const c04 = useContext(D06Context);
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

D06PrintButtonContainer.propTypes = {};

D06PrintButtonContainer.displayName = "D06PrintButtonContainer";
export default D06PrintButtonContainer;



