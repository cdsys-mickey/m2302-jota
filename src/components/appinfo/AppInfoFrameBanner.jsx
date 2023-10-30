import { forwardRef, memo } from "react";
import FrameBanner from "@/shared-components/protected-page/FrameBanner";
import PropTypes from "prop-types";

const AppInfoFrameBanner = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return <FrameBanner ref={ref} title="基本" {...rest} />;
	})
);

AppInfoFrameBanner.propTypes = {};

AppInfoFrameBanner.displayName = "AppInfoFrameBanner";
export default AppInfoFrameBanner;
