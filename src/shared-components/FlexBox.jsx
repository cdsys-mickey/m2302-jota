import { Box, styled } from "@mui/material";


/**
 * 包裝 Box 針對 Flex 常用功能去簡化使用的元件
 * 修改歷程:
 * 2021.09.30 初版
 */
const FlexBox = styled(Box, {
	shouldForwardProp: (prop) =>
		!['inline', 'block', 'fullWidth', 'fullHeight', 'midWidth', 'maxWidth'].includes(prop),
})(({ theme, inline = false, block = false, fullHeight, fullWidth, minWidth, maxWidth }) => ({
	display: block ? "block" : inline ? "inline-flex" : "flex",
	...(fullHeight && {
		height: "100vh",
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
