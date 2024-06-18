import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { forwardRef, memo, useContext, useMemo } from "react";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { useCallback } from "react";
import PropTypes from "prop-types";
export const ZA03AuthCopyButtonContainer = forwardRef((props, ref) => {
	const { children = "複製自其他使用者", ...rest } = props;
	const za03 = useContext(ZA03Context);

	const handleClick = useCallback(
		(e) => {
			za03.promptCopyAuth(e);
		},
		[za03]
	);

	if (za03.authGridEditing) {
		return false;
	}

	return (
		<ResponsiveButton
			ref={ref}
			startIcon={<ContentCopyIcon />}
			onClick={handleClick}
			sx={{
				fontWeight: 600,
			}}
			{...rest}>
			{children}
		</ResponsiveButton>
	);
});
ZA03AuthCopyButtonContainer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};
ZA03AuthCopyButtonContainer.displayName = "ZA03AuthCopyButtonContainer";
