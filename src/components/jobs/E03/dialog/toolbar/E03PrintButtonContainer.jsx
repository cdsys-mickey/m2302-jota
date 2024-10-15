import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { E03Context } from "@/contexts/E03/E03Context";
import { useFormContext } from "react-hook-form";

const E03PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const e03 = useContext(E03Context);
		const { canPrint } = e03;

		const handleSubmit = form.handleSubmit(
			e03.onPrintSubmit,
			e03.onPrintSubmitError
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

E03PrintButtonContainer.propTypes = {};

E03PrintButtonContainer.displayName = "E03PrintButtonContainer";
export default E03PrintButtonContainer;




