import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { E01Context } from "@/contexts/E01/E01Context";
import { useFormContext } from "react-hook-form";

const E01PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const e01 = useContext(E01Context);
		const { canPrint } = e01;

		const handleSubmit = form.handleSubmit(
			e01.onPrintSubmit,
			e01.onPrintSubmitError
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

E01PrintButtonContainer.propTypes = {};

E01PrintButtonContainer.displayName = "E01PrintButtonContainer";
export default E01PrintButtonContainer;


