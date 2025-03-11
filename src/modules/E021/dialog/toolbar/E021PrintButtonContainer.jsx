import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { E021Context } from "@/modules/E021/E021Context";
import { useFormContext } from "react-hook-form";

const E021PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const e021 = useContext(E021Context);
		const { canPrint } = e021;

		const handleSubmit = form.handleSubmit(
			e021.onPrintSubmit,
			e021.onPrintSubmitError
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

E021PrintButtonContainer.propTypes = {};

E021PrintButtonContainer.displayName = "E021PrintButtonContainer";
export default E021PrintButtonContainer;



