import { F05Context } from "@/contexts/F05/F05Context";
import ButtonWrapper from "@/shared-components/ButtonWrapper";
import LockIcon from '@mui/icons-material/Lock';
import { forwardRef, memo, useContext } from "react";

const F05CloseButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const f05 = useContext(F05Context);

		return (
			<ButtonWrapper
				responsive
				ref={ref}
				variant="contained"
				startIcon={<LockIcon />}
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
F05CloseButtonContainer.displayName = "F05CloseButtonContainer";
export default F05CloseButtonContainer;


