import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import Users from "@/modules/md-users";
import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import { useMemo } from "react";
import { useCallback, useContext } from "react";
import { useFormContext } from "react-hook-form";
import ActionState from "../../../../../shared-constants/action-state";

export const ZA03AuthBatchSubmitButtonContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);
	// const form = useFormContext();

	if (za03.authEditingMode !== Users.AUTH_EDITING_MODE.SUBMIT) {
		return false;
	}

	return (
		<ResponsiveButton
			onClick={za03.handleAuthSave}
			disabled={!za03.isDirty}
			loading={za03.saveAuthState === ActionState.WORKING}
			{...rest}>
			儲存
		</ResponsiveButton>
	);
};

ZA03AuthBatchSubmitButtonContainer.displayName =
	"ZA03AuthBatchSubmitButtonContainer";
