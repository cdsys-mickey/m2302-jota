import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import ZA03 from "@/modules/md-za03";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import UserAuth from "../../../../../modules/md-user-auth";

export const ZA03AuthInstantEditFinishButtonContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);

	if (za03.authGridEditingMode !== UserAuth.AUTH_EDITING_MODE.CLICK) {
		return false;
	}

	return (
		<ResponsiveButton
			color="neutral"
			onClick={za03.stopInstantEditing}
			{...rest}>
			結束編輯
		</ResponsiveButton>
	);
};

ZA03AuthInstantEditFinishButtonContainer.displayName =
	"ZA03AuthInstantEditFinishButtonContainer";
