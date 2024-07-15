import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import { useContext } from "react";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";

export const ZA03AuthClearSelectionButtonContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);
	if (!za03.authGridEditing) {
		return false;
	}

	return (
		<ButtonWrapper
			startIcon={<RemoveDoneIcon />}
			onClick={za03.clearSelection}
			{...rest}
		/>
	);
};
ZA03AuthClearSelectionButtonContainer.displayName =
	"ZA03AuthClearSelectionButtonContainer";
