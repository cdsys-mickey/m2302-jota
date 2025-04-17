import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { B05Context } from "@/modules/B05/B05Context";
import { useFormContext } from "react-hook-form";

const B05PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const b05 = useContext(B05Context);
		const { canPrint } = b05;

		const handleSubmit = form.handleSubmit(
			b05.onPrintSubmit,
			b05.onPrintSubmitError
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

B05PrintButtonContainer.propTypes = {};

B05PrintButtonContainer.displayName = "B05PrintButtonContainer";
export default B05PrintButtonContainer;
