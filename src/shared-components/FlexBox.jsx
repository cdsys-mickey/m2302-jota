import { Box, styled } from "@mui/material";
import clsx from "clsx";
import PropTypes from "prop-types";


/**
 * 包裝 Box 針對 Flex 常用功能去簡化使用的元件
 * 修改歷程:
 * 2021.09.30 初版
 */
const FlexBoxBase = styled(Box, {
	shouldForwardProp: (prop) =>
		!['inline', 'block', 'fullWidth', 'fullHeight', 'fullWindowHeight', 'midWidth', 'maxWidth', 'gap'].includes(prop),
})(({ theme, inline = false, block = false, fullHeight, fullWindowHeight, fullWidth, minWidth, maxWidth, gap }) => ({
	display: block ? "block" : inline ? "inline-flex" : "flex",
	...(fullHeight && {
		height: "100%",
	}),
	...(fullWindowHeight && {
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
	...(gap && {
		gap: isNaN(gap) ? gap : theme.spacing(gap),
	}),
}));

const FlexBox = (props) => {
	const { className, ...rest } = props;
	return <FlexBoxBase className={clsx("FlexBox", className)} {...rest} />
}
FlexBox.propTypes = {
	className: PropTypes.string
}
export default FlexBox;
