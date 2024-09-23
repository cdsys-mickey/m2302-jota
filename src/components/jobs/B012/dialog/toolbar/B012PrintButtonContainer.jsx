import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { B012Context } from "@/contexts/B012/B012Context";
import { useFormContext } from "react-hook-form";

const B012PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const b012 = useContext(B012Context);
		const { canPrint } = b012;

		const handleSubmit = form.handleSubmit(
			b012.onPrintSubmit,
			b012.onPrintSubmitError
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

B012PrintButtonContainer.propTypes = {};

B012PrintButtonContainer.displayName = "B012PrintButtonContainer";
export default B012PrintButtonContainer;


