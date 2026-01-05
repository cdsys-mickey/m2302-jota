import { forwardRef, useMemo } from "react";
import { Container, styled } from "@mui/material";
import PropTypes from "prop-types";

// 1. 定義標準斷點清單
const MUI_BREAKPOINTS = ["xs", "sm", "md", "lg", "xl"];

// 2. 建立樣式化的基礎元件
const StyledContainer = styled(Container, {
	shouldForwardProp: (prop) => !["alignLeft", "customMaxWidth"].includes(prop),
})(({ alignLeft, customMaxWidth }) => ({
	// 如果有自定義寬度，則應用它
	...(customMaxWidth && {
		maxWidth: `${customMaxWidth} !important`, // 強制覆蓋內建樣式
	}),
	...(alignLeft && {
		"&": {
			marginLeft: 0,
			paddingLeft: 0,
		},
		"& .MuiPaper-root": {
			justifyContent: "flex-start",
		},
	}),
}));

// 3. 封裝邏輯的元件
const ContainerEx = forwardRef(({ maxWidth, ...props }, ref) => {
	// 判斷是否為自定義 CSS 寬度
	const isCustomWidth = useMemo(() => {
		return maxWidth && !MUI_BREAKPOINTS.includes(maxWidth)
	}, [maxWidth]);

	const _customMaxWidth = useMemo(() => {
		return typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth
	}, [maxWidth]);

	return (
		<StyledContainer
			ref={ref}
			// 如果是自定義寬度，傳 false 給 MUI 原生屬性，並透過 customMaxWidth 傳遞給 styled
			maxWidth={isCustomWidth ? false : maxWidth}
			customMaxWidth={isCustomWidth ? _customMaxWidth : null}
			{...props}
		/>
	);
});
ContainerEx.propTypes = {
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
ContainerEx.displayName = "ContainerEx";

export default ContainerEx;