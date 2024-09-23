import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { B031Context } from "@/contexts/B031/B031Context";
import { useFormContext } from "react-hook-form";

const B031PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const b031 = useContext(B031Context);
		const { canPrint } = b031;

		const handleSubmit = form.handleSubmit(
			b031.onPrintSubmit,
			b031.onPrintSubmitError
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

B031PrintButtonContainer.propTypes = {};

B031PrintButtonContainer.displayName = "B031PrintButtonContainer";
export default B031PrintButtonContainer;


