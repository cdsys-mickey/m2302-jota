import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { C09Context } from "@/contexts/C09/C09Context";
import { useFormContext } from "react-hook-form";

const C09PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const c09 = useContext(C09Context);
		const { canPrint } = c09;

		const handleSubmit = form.handleSubmit(
			c09.onPrintSubmit,
			c09.onPrintSubmitError
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

C09PrintButtonContainer.propTypes = {};

C09PrintButtonContainer.displayName = "C09PrintButtonContainer";
export default C09PrintButtonContainer;
