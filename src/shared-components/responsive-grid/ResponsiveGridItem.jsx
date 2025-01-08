import { Grid, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import { memo } from "react";
import { useMemo } from "react";
import PropTypes from "prop-types";
import ResponsiveLayoutContext from "../responsive/ResponsiveLayoutContext";
import { useTheme } from "@mui/system";
import { ResponsiveGridContext } from "./ResponsiveGridContext";

const ResponsiveGridItem = memo((props) => {
	const { xs, sm, md, lg, xl, ...rest } = props;
	const responsiveLayout = useContext(ResponsiveLayoutContext);
	const responsiveGrid = useContext(ResponsiveGridContext);

	const {
		width,
		isSmOrUp,
		isMdOrUp,
		isLgOrUp,
		isXl
	} = responsiveLayout || responsiveGrid;

	const { initSize, columns } = responsiveGrid;

	const theme = useTheme();

	const xlOrUp = useMediaQuery(theme.breakpoints.up('xl'));
	const lgOrUp = useMediaQuery(theme.breakpoints.up('lg'));
	const mdOrUp = useMediaQuery(theme.breakpoints.up('md'));
	const smOrUp = useMediaQuery(theme.breakpoints.up('sm'));

	const _xlElastic = useMemo(() => {
		return xl || lg || md || sm || xs || columns / 6;
	}, [columns, lg, md, sm, xl, xs])

	const _lgElastic = useMemo(() => {
		return lg || xl || md || sm || xs || columns / 4;
	}, [columns, lg, md, sm, xl, xs])

	const _mdElastic = useMemo(() => {
		return md || lg || xl || sm || xs || columns / 3;
	}, [columns, lg, md, sm, xl, xs])

	const _smElastic = useMemo(() => {
		return sm || xs || md || lg || xl || columns
	}, [columns, lg, md, sm, xl, xs])

	const _xsElastic = useMemo(() => {
		return xs || sm || md || columns
	}, [columns, md, sm, xs])

	/**
	 * 計算寬度的演算法 
	 * md 以上先大後小
	 * md 以下先小後大
	 */
	const _xs = useMemo(() => {
		// 初始化前
		if (!width) {
			// 使用 initSize 偵測
			if (initSize) {
				switch (initSize) {
					case "xl":
						return _xlElastic;
					case "lg":
						return _lgElastic;
					case "md":
						return _mdElastic;
					case "sm":
						return _smElastic;
					default:
						return _xsElastic;
				}
			}
			// 使用 device size 偵測
			if (xlOrUp) {
				return _xlElastic;
			} else if (lgOrUp) {
				return _lgElastic;
			} else if (mdOrUp) {
				return _mdElastic;
			} else if (smOrUp) {
				return _smElastic;
			}
			return _xsElastic;
		}
		if (isXl) {
			// console.log("isXl");
			return _xlElastic;
		} else if (isLgOrUp) {
			// console.log("isLgOrUp");
			return _lgElastic;
		} else if (isMdOrUp) {
			// console.log("isMdOrUp");
			return _mdElastic;
		} else if (isSmOrUp) {
			// console.log("isSmOrUp");
			return _smElastic;
		}
		// console.log("isXs");
		return _xsElastic;
	}, [_lgElastic, _mdElastic, _smElastic, _xlElastic, _xsElastic, initSize, isLgOrUp, isMdOrUp, isSmOrUp, isXl, lgOrUp, mdOrUp, smOrUp, width, xlOrUp])


	// return <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} {...rest} />;

	// if (!width) {
	// 	<Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} {...rest} />
	// }

	return (
		<Grid item {...(_xs && { xs: _xs })} {...rest} />
	);
})

ResponsiveGridItem.propTypes = {
	xs: PropTypes.number,
	sm: PropTypes.number,
	md: PropTypes.number,
	lg: PropTypes.number,
	xl: PropTypes.number,
}

ResponsiveGridItem.displayName = "ResponsiveGridItem";
export default ResponsiveGridItem;