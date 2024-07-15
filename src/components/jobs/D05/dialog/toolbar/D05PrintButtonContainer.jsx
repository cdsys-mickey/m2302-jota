import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { D05Context } from "@/contexts/D05/D05Context";
import { useFormContext } from "react-hook-form";

const D05PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const d05 = useContext(D05Context);
		const { canPrint } = d05;

		const handleSubmit = form.handleSubmit(
			d05.onPrintSubmit,
			d05.onPrintSubmitError
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

D05PrintButtonContainer.propTypes = {};

D05PrintButtonContainer.displayName = "D05PrintButtonContainer";
export default D05PrintButtonContainer;

