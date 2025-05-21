import { F05Context } from "@/contexts/F05/F05Context";
import ButtonWrapper from "@/shared-components/ButtonWrapper";
import { forwardRef, memo, useContext } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

const F05CarryForwardButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const f05 = useContext(F05Context);

		return (
			<ButtonWrapper
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
			</ButtonWrapper>
		);
	})
);
F05CarryForwardButtonContainer.displayName = "F05CarryForwardButtonContainer";
export default F05CarryForwardButtonContainer;


