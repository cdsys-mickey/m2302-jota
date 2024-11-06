import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { forwardRef, memo, useContext } from "react";
import { B012Context } from "@/contexts/B012/B012Context";
import { useFormContext, useWatch } from "react-hook-form";
import { Tooltip } from "@mui/material";
import { useMemo } from "react";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import { B032Context } from "@/contexts/B032/B032Context";
import { BContext } from "@/contexts/B/BContext";

const B012PrintButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const form = useFormContext();
		const b = useContext(BContext);
		const b012 = useContext(b.forNew ? B032Context : B012Context);
		const { canPrint } = b012;

		const lvProd = useWatch({
			name: "lvProd",
		})


		const disabled = useMemo(() => {
			return !lvProd;
		}, [lvProd])

		const _title = useMemo(() => {
			return disabled ? "請先選擇貨品" : "";
		}, [disabled])

		const handleSubmit = useMemo(() => {
			return form.handleSubmit(
				b012.onPrintPromptSubmit,
				b012.onPrintPromptSubmitError
			)
		}, [b012.onPrintPromptSubmit, b012.onPrintPromptSubmitError, form]);

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
						{...rest}>
						列印
					</ButtonWrapper>
				</span>
			</Tooltip >
		);
	})
);

B012PrintButtonContainer.propTypes = {};

B012PrintButtonContainer.displayName = "B012PrintButtonContainer";
export default B012PrintButtonContainer;


