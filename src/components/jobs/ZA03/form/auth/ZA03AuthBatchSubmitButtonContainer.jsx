import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import UserAuth from "@/modules/md-user-auth";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import ActionState from "@/shared-constants/action-state";
import { useContext } from "react";
import PropTypes from "prop-types";

export const ZA03AuthBatchSubmitButtonContainer = (props) => {
	const { children = "儲存", ...rest } = props;
	const za03 = useContext(ZA03Context);
	// const form = useFormContext();

	if (
		za03.authGridEditingMode !== UserAuth.AUTH_EDITING_MODE.SUBMIT ||
		za03.authGridLoading
	) {
		return false;
	}

	return (
		<ButtonWrapper
			onClick={za03.handleAuthSave}
			// disabled={!za03.isDirty}
			loading={za03.saveAuthState === ActionState.WORKING}
			{...rest}>
			{children}
		</ButtonWrapper>
	);
};
ZA03AuthBatchSubmitButtonContainer.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
	]),
};
ZA03AuthBatchSubmitButtonContainer.displayName =
	"ZA03AuthBatchSubmitButtonContainer";
