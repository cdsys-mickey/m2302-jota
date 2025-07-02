import { ButtonEx } from "@/shared-components";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { forwardRef, memo, useContext } from "react";
import { G07Context } from "../../G07Context";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

const G07CarryForwardButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const g07 = useContext(G07Context);
		const form = useFormContext();

		const handleSubmit = useMemo(() => {
			return form.handleSubmit(g07.onSubmit, g07.onSubmitError);
		}, [form, g07.onSubmit, g07.onSubmitError])

		return (
			<ButtonEx
				responsive
				ref={ref}
				variant="contained"
				startIcon={<CurrencyExchangeIcon />}
				onClick={handleSubmit}
				loading={g07.updateWorking}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				結轉
			</ButtonEx>
		);
	})
);
G07CarryForwardButtonContainer.displayName = "G07CarryForwardButtonContainer";
export default G07CarryForwardButtonContainer;


