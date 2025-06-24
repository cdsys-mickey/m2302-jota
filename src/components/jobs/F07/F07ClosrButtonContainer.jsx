import { F07Context } from "@/contexts/F07/F07Context";
import { ButtonEx } from "@/shared-components";
import LockIcon from '@mui/icons-material/Lock';
import { forwardRef, memo, useContext } from "react";

const F07CloseButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const f07 = useContext(F07Context);

		return (
			<ButtonEx
				responsive
				ref={ref}
				variant="contained"
				startIcon={<LockIcon />}
				onClick={f07.confirmCarryForward}
				loading={f07.updateWorking}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				結轉
			</ButtonEx>
		);
	})
);
F07CloseButtonContainer.displayName = "F07CloseButtonContainer";
export default F07CloseButtonContainer;


