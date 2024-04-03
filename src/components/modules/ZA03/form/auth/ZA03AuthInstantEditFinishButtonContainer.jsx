import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import Users from "@/modules/md-users";
import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import { useCallback, useContext } from "react";

export const ZA03AuthInstantEditFinishButtonContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);

	if (za03.authEditingMode !== Users.AUTH_EDITING_MODE.CLICK) {
		return false;
	}

	return (
		<ResponsiveButton
			color="neutral"
			onClick={za03.stopInstantEditing}
			{...rest}>
			結束即時編輯
		</ResponsiveButton>
	);
};

ZA03AuthInstantEditFinishButtonContainer.displayName =
	"ZA03AuthInstantEditFinishButtonContainer";
