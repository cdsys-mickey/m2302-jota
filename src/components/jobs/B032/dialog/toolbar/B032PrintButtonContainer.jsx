import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { B032Context } from "@/contexts/B032/B032Context";
import { useFormContext } from "react-hook-form";
import { B012Context } from "@/contexts/B012/B012Context";
import { BContext } from "@/contexts/B/BContext";

const B032PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const b = useContext(BContext);
		const b032 = useContext(b.forNew ? B032Context : B012Context);
		const { canPrint } = b032;

		const handleSubmit = form.handleSubmit(
			b032.onPrintSubmit,
			b032.onPrintSubmitError
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

B032PrintButtonContainer.propTypes = {};

B032PrintButtonContainer.displayName = "B032PrintButtonContainer";
export default B032PrintButtonContainer;



