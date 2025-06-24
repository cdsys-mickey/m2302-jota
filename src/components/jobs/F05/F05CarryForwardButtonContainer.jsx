import { F05Context } from "@/contexts/F05/F05Context";
import { ButtonEx } from "@/shared-components";
import { forwardRef, memo, useContext } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

const F05CarryForwardButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const f05 = useContext(F05Context);

		return (
			<ButtonEx
				responsive
				ref={ref}
				variant="contained"
				startIcon={<CurrencyExchangeIcon />}
				onClick={f05.confirmClose}
				loading={f05.updateWorking}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				結轉
			</ButtonEx>
		);
	})
);
F05CarryForwardButtonContainer.displayName = "F05CarryForwardButtonContainer";
export default F05CarryForwardButtonContainer;


