import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { B04Context } from "@/contexts/B04/B04Context";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";
import ButtonWrapper from "@/shared-components/ButtonWrapper";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";

const B04ListPrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const b04 = useContext(B04Context);
		const { moduleAuthorityLoading, canPrint } = b04;

		const handleSubmit = useMemo(() => {
			return form.handleSubmit(b04.onPrintSubmit, b04.onPrintSubmitError)
		}, [b04.onPrintSubmit, b04.onPrintSubmitError, form])

		if (moduleAuthorityLoading || !canPrint) {
			return false;
		}

		return (
			<ButtonWrapper
				className="button"
				responsive
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
			</ButtonWrapper>
		);
	})
);

B04ListPrintButtonContainer.propTypes = {};

B04ListPrintButtonContainer.displayName = "B04ListPrintButtonContainer";
export default B04ListPrintButtonContainer;

