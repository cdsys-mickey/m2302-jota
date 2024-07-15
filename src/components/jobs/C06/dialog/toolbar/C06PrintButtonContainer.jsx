import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { C06Context } from "@/contexts/C06/C06Context";
import { useFormContext } from "react-hook-form";

const C06PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const c06 = useContext(C06Context);
		const { canPrint } = c06;

		const handleSubmit = form.handleSubmit(
			c06.onPrintSubmit,
			c06.onPrintSubmitError
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

C06PrintButtonContainer.propTypes = {};

C06PrintButtonContainer.displayName = "C06PrintButtonContainer";
export default C06PrintButtonContainer;
