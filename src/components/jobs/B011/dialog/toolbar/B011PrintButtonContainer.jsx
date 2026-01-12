import { BContext } from "@/contexts/B/BContext";
import { B011Context } from "@/contexts/B011/B011Context";
import { B031Context } from "@/contexts/B031/B031Context";
import { ButtonEx } from "@/shared-components";
import { TooltipWrapper } from "shared-components";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import PropTypes from "prop-types";
import { forwardRef, memo, useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const B011PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { forNew = false, ...rest } = props;
		const b = useContext(BContext);
		const b011 = useContext(b.forNew ? B031Context : B011Context);
		const { canPrint } = b011;
		const form = useFormContext();

		const customer = useWatch({
			name: "lvCust",
		})

		const disabled = useMemo(() => {
			return !customer;
		}, [customer])

		const _title = useMemo(() => {
			return disabled ? "請先選擇客戶" : "";
		}, [disabled])

		const handleSubmit = useMemo(() => {
			return form.handleSubmit(b011.onPrintPromptSubmit, b011.onPrintPromptSubmitError);
		}, [b011.onPrintPromptSubmit, b011.onPrintPromptSubmitError, form])

		if (!canPrint) {
			return false;
		}

		return (
			<TooltipWrapper title={_title} arrow disabled={disabled}>
				<ButtonEx
					responsive
					ref={ref}
					variant="contained"
					startIcon={<LocalPrintshopIcon />}
					sx={{
						fontWeight: 600,
					}}
					onClick={disabled ? null : handleSubmit}
					color="neutral"
					disabled={disabled}
					{...rest}>
					列印
				</ButtonEx>
			</TooltipWrapper>
		);
	})
);

B011PrintButtonContainer.propTypes = {
	forNew: PropTypes.bool
};

B011PrintButtonContainer.displayName = "B011PrintButtonContainer";
export default B011PrintButtonContainer;

