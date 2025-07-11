import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { B02Context } from "@/contexts/B02/B02Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";
import { ButtonEx } from "@/shared-components";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";
import { BContext } from "@/contexts/B/BContext";
import { B04Context } from "@/contexts/B04/B04Context";

const B02ListPrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const b = useContext(BContext);
		const b02 = useContext(b.forNew ? B04Context : B02Context);
		const { moduleAuthorityLoading, canPrint } = b02;

		const handleSubmit = useMemo(() => {
			return form.handleSubmit(b02.onPrintSubmit, b02.onPrintSubmitError)
		}, [b02.onPrintSubmit, b02.onPrintSubmitError, form])

		if (moduleAuthorityLoading || !canPrint) {
			return false;
		}

		return (
			<ButtonEx
				responsive
				className="button"
				ref={ref}
				variant="contained"
				startIcon={<LocalPrintshopIcon />}
				sx={{
					fontWeight: 600,
				}}
				onClick={handleSubmit}
				color="neutral"
				{...rest}>
				列印
			</ButtonEx>
		);
	})
);

B02ListPrintButtonContainer.propTypes = {};

B02ListPrintButtonContainer.displayName = "B02ListPrintButtonContainer";
export default B02ListPrintButtonContainer;
