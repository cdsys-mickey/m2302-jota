import { ButtonEx } from "@/shared-components";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import { useContext } from "react";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";

export const ZA03AuthClearAllButtonContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);
	if (!za03.authGridEditing) {
		return false;
	}

	return (
		<ButtonEx
			// startIcon={<RemoveDoneIcon />}
			onClick={za03.clearAll}
			{...rest}
		/>
	);
};
ZA03AuthClearAllButtonContainer.displayName = "ZA03AuthClearAllButtonContainer";
