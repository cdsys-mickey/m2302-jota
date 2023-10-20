import { Box, styled } from "@mui/material";
import React, { forwardRef } from "react";

const FlexBoxBase = forwardRef((props, ref) => {
	const { children, inline = false, block = false, ...other } = props;
	return (
		<Box
			ref={ref}
			display={block ? "block" : inline ? "inline-flex" : "flex"}
			{...other}>
			{children}
		</Box>
	);
});
FlexBoxBase.displayName = "FlexBoxBase";

/**
 * 包裝 Box 針對 Flex 常用功能去簡化使用的元件
 * 修改歷程:
 * 2021.09.30 初版
 */
const FlexBox = styled(FlexBoxBase, {
	shouldForwardProp: (prop) =>
		!`fullWidth,fullHeight,midWidth,maxWidth`
			.trim()
			.split(/\s*,\s*/)
			.includes(prop),
})(({ theme, fullHeight, fullWidth, minWidth, maxWidth }) => ({
	...(fullHeight && {
		height: "100%",
	}),
	...(fullWidth && {
		width: "100%",
	}),
	...(minWidth && {
		minWidth: isNaN(minWidth) ? minWidth : theme.spacing(minWidth),
	}),
	...(maxWidth && {
		maxWidth: isNaN(maxWidth) ? maxWidth : theme.spacing(maxWidth),
	}),
}));

export default FlexBox;
