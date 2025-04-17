import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { G02Context } from "@/modules/G02/G02Context";
import { useFormContext } from "react-hook-form";

const G02PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const g02 = useContext(G02Context);
		const { canPrint } = g02;

		const handleSubmit = form.handleSubmit(
			g02.onPrintSubmit,
			g02.onPrintSubmitError
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

G02PrintButtonContainer.propTypes = {};

G02PrintButtonContainer.displayName = "G02PrintButtonContainer";
export default G02PrintButtonContainer;

