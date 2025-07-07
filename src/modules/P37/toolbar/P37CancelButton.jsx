import { ButtonEx } from "@/shared-components";

import { useContext } from "react";
import P37Context from "../P37Context";

const P37CancelButton = (props) => {
	const { ...rest } = props;
	const p37 = useContext(P37Context);

	if (
		p37.grid.gridLoading ||
		!p37.grid.gridData ||
		p37.grid.gridData?.length === 0 ||
		p37.grid.readOnly ||
		p37.saveWorking
	) {
		return false;
	}

	return (
		<ButtonEx
			responsive
			color="warning"
			variant="outlined"
			size="small"
			// endIcon={<SaveIcon />}
			loading={p37.saveWorking}
			onClick={p37.cancelEdit}
			{...rest}
		>取消</ButtonEx>

	)
}

P37CancelButton.displayName = "P37CancelButton";
export default P37CancelButton;