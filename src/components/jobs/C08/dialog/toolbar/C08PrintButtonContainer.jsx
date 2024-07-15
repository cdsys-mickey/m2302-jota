import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { C08Context } from "@/contexts/C08/C08Context";
import { useFormContext } from "react-hook-form";

const C08PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const c08 = useContext(C08Context);
		const { canPrint } = c08;

		const handleSubmit = form.handleSubmit(
			c08.onPrintSubmit,
			c08.onPrintSubmitError
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

C08PrintButtonContainer.propTypes = {};

C08PrintButtonContainer.displayName = "C08PrintButtonContainer";
export default C08PrintButtonContainer;
