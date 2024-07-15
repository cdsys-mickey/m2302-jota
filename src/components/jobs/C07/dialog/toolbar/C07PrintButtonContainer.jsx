import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { C07Context } from "@/contexts/C07/C07Context";
import { useFormContext } from "react-hook-form";

const C07PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const c07 = useContext(C07Context);
		const { canPrint } = c07;

		const handleSubmit = form.handleSubmit(
			c07.onPrintSubmit,
			c07.onPrintSubmitError
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

C07PrintButtonContainer.propTypes = {};

C07PrintButtonContainer.displayName = "C07PrintButtonContainer";
export default C07PrintButtonContainer;
