import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { F01Context } from "@/contexts/F01/F01Context";
import { useFormContext } from "react-hook-form";

const F01PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const f01 = useContext(F01Context);
		const { canPrint } = f01;

		const handleSubmit = form.handleSubmit(
			f01.onPrintSubmit,
			f01.onPrintSubmitError
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

F01PrintButtonContainer.propTypes = {};

F01PrintButtonContainer.displayName = "F01PrintButtonContainer";
export default F01PrintButtonContainer;

