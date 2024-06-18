import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { useContext } from "react";
import UserAuth from "@/modules/md-user-auth";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import PropTypes from "prop-types";

export const ZA03AuthBatchCancelButtonContainer = (props) => {
	const { children, ...rest } = props;
	const za03 = useContext(ZA03Context);

	if (
		za03.authGridEditingMode !== UserAuth.AUTH_EDITING_MODE.SUBMIT ||
		za03.authGridLoading
	) {
		return false;
	}
	return (
		<ButtonWrapper
			// disabled={za03.isDirty}
			onClick={za03.confirmCancelAuthEditing}
			{...rest}>
			{children}
		</ButtonWrapper>
	);
};
ZA03AuthBatchCancelButtonContainer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};
ZA03AuthBatchCancelButtonContainer.displayName =
	"ZA03AuthBatchCancelButtonContainer";
