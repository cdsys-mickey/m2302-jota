import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { C05Context } from "@/contexts/C05/C05Context";
import { useFormContext } from "react-hook-form";

const C05PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const c05 = useContext(C05Context);
		const { canPrint } = c05;

		const handleSubmit = form.handleSubmit(
			c05.onPrintSubmit,
			c05.onPrintSubmitError
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

C05PrintButtonContainer.propTypes = {};

C05PrintButtonContainer.displayName = "C05PrintButtonContainer";
export default C05PrintButtonContainer;
