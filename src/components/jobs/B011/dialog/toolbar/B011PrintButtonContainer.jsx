import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { B011Context } from "@/contexts/B011/B011Context";
import { useFormContext, useWatch } from "react-hook-form";
import { useMemo } from "react";
import { Tooltip } from "@mui/material";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import PropTypes from "prop-types";
import { B031Context } from "@/contexts/B031/B031Context";
import { BContext } from "@/contexts/B/BContext";

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
			<Tooltip title={_title} arrow >
				<span>
					<ButtonWrapper
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
					</ButtonWrapper>
				</span>
			</Tooltip>
		);
	})
);

B011PrintButtonContainer.propTypes = {
	forNew: PropTypes.bool
};

B011PrintButtonContainer.displayName = "B011PrintButtonContainer";
export default B011PrintButtonContainer;

