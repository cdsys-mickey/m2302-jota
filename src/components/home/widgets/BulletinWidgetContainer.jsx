import { forwardRef } from "react";
import BulletinWidget from "./BulletinWidget";
import useWindowSize from "@/shared-hooks/useWindowSize";

const BulletinWidgetContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	return <BulletinWidget ref={ref} height={height - 162} {...rest} />;
});

BulletinWidgetContainer.displayName = "BulletinWidget";

export default BulletinWidgetContainer;
