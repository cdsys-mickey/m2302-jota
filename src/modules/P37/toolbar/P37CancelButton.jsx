import { ButtonEx } from "@/shared-components";

import { useContext } from "react";
import P37Context from "../P37Context";

const P37CancelButton = (props) => {
	const { ...rest } = props;
	const p37 = useContext(P37Context);

	if (!p37.editing) {
		return false;
	}

	return (
		<ButtonEx
			responsive
			color="warning"
			variant="outlined"
			size="small"
			onClick={p37.cancelEditing}
			{...rest}
		>取消</ButtonEx>

	)
}

P37CancelButton.displayName = "P37CancelButton";
export default P37CancelButton;