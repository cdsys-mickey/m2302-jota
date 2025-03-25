import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { P14Context } from "@/modules/P14/P14Context";
import { useFormContext } from "react-hook-form";

const P14PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const p14 = useContext(P14Context);
		const { canPrint } = p14;

		const handleSubmit = form.handleSubmit(
			p14.onPrintSubmit,
			p14.onPrintSubmitError
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

P14PrintButtonContainer.propTypes = {};

P14PrintButtonContainer.displayName = "P14PrintButtonContainer";
export default P14PrintButtonContainer;


