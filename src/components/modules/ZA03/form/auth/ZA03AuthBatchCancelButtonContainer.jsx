import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import Users from "@/modules/md-users";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useCallback, useContext } from "react";

export const ZA03AuthBatchCancelButtonContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);

	if (za03.authEditingMode !== Users.AUTH_EDITING_MODE.SUBMIT) {
		return false;
	}
	return (
		<ResponsiveButton
			// disabled={za03.isDirty}
			onClick={za03.confirmCancelAuthEditing}
			{...rest}>
			放棄修改
		</ResponsiveButton>
	);
};

ZA03AuthBatchCancelButtonContainer.displayName =
	"ZA03AuthBatchCancelButtonContainer";
