import { BContext } from "@/contexts/B/BContext";
import { B02Context } from "@/contexts/B02/B02Context";
import { B04Context } from "@/contexts/B04/B04Context";
import { ButtonEx } from "@/shared-components";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { useFormContext } from "react-hook-form";

const B02PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const b = useContext(BContext);
		const b02 = useContext(b.forNew ? B04Context : B02Context);
		const { canPrint } = b02;

		const handleSubmit = form.handleSubmit(
			b02.onPrintSubmit,
			b02.onPrintSubmitError
		);

		if (!canPrint) {
			return false;
		}

		return (
			<ButtonEx
				responsive
				ref={ref}
				// variant="contained"
				startIcon={<LocalPrintshopIcon />}
				sx={{
					fontWeight: 600,
					width: "8rem"
				}}
				onClick={handleSubmit}
				color="neutral"
				{...rest}>
				列印
			</ButtonEx>
		);
	})
);

B02PrintButtonContainer.propTypes = {};

B02PrintButtonContainer.displayName = "B02PrintButtonContainer";
export default B02PrintButtonContainer;


