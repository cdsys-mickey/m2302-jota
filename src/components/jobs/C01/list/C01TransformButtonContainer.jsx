import { C01Context } from "@/contexts/C01/C01Context";
import ButtonWrapper from "@/shared-components/ButtonWrapper";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useContext, useMemo } from "react";

export const C01TransformButtonContainer = memo(
	forwardRef((props, ref) => {
		const { children = "形成採購單", ...rest } = props;
		const c01 = useContext(C01Context);

		const disabled = useMemo(() => {
			return !c01.canManage;
		}, [c01.canManage])

		const handleTransform = useMemo(() => {
			return !disabled ? c01.promptTransformList : null;
		}, [c01.promptTransformList, disabled]);

		const _title = useMemo(() => {
			return disabled ? "需具備 C01 管理權限" : "";
		}, [disabled])

		return (
			<Tooltip title={_title} arrow >
				<span>
					<ButtonWrapper
						ref={ref}
						responsive
						startIcon={<CheckCircleOutlineIcon />}
						onClick={handleTransform}
						disabled={disabled}
						{...rest}>
						{children}
					</ButtonWrapper>

				</span>
			</Tooltip>
		);
	})
);

C01TransformButtonContainer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

C01TransformButtonContainer.displayName = "C01TransformButtonContainer";
