import { useContext } from "react";
import ResponsiveLayoutContext from "../responsive/ResponsiveLayoutContext";
import FlexBox from "../FlexBox";
import { memo } from "react";
import PropTypes from "prop-types";

const ResponsiveLineBreak = memo((props) => {
	const { lg = false, md = false, sm = false, xs = false } = props;
	const { isXl, isLgOrUp, isMdOrUp, isSmOrUp } = useContext(ResponsiveLayoutContext);

	if ((lg && isXl) || (md && isLgOrUp) || (sm && !isMdOrUp) || (xs && !isSmOrUp)) {
		return false;
	}

	return (
		<FlexBox fullWidth />
	);
})

ResponsiveLineBreak.propTypes = {
	xl: PropTypes.bool,
	lg: PropTypes.bool,
	md: PropTypes.bool,
	sm: PropTypes.bool,
	xs: PropTypes.bool,
}

ResponsiveLineBreak.displayName = "ResponsiveLineBreak";
export default ResponsiveLineBreak;