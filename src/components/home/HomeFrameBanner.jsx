import FrameBanner from "@/shared-components/protected-page/FrameBanner";
import { forwardRef } from "react";

const HomeFrameBanner = forwardRef((props, ref) => {
	const { ...rest } = props;

	return <FrameBanner title="首頁" alt="home" ref={ref} {...rest} />;
});

HomeFrameBanner.displayName = "HomeFrameBanner";

export default HomeFrameBanner;
