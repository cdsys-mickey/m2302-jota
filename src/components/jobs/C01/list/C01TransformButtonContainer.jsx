import { C01Context } from "@/contexts/C01/C01Context";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PropTypes from "prop-types";
import { forwardRef, memo, useContext, useMemo } from "react";

export const C01TransformButtonContainer = memo(
	forwardRef((props, ref) => {
		const { children = "形成採購單", ...rest } = props;
		const c01 = useContext(C01Context);

		const handleTransform = useMemo(() => {
			return c01.canManage ? c01.promptTransformList : null;
		}, [c01.canManage, c01.promptTransformList]);

		return (
			<ButtonWrapper
				ref={ref}
				responsive
				startIcon={<CheckCircleOutlineIcon />}
				onClick={handleTransform}
				{...rest}>
				{children}
			</ButtonWrapper>
		);
	})
);

C01TransformButtonContainer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

C01TransformButtonContainer.displayName = "C01TransformButtonContainer";
