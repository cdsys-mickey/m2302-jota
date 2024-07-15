import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { D02Context } from "@/contexts/D02/D02Context";
import { useFormContext } from "react-hook-form";

const D02PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const c04 = useContext(D02Context);
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

D02PrintButtonContainer.propTypes = {};

D02PrintButtonContainer.displayName = "D02PrintButtonContainer";
export default D02PrintButtonContainer;


