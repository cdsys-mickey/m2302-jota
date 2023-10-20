import React, { useMemo } from "react";
import DialogEx from "../dialog/DialogEx";
import { useResponsive } from "@/shared-contexts/useResponsive";

/**
 * 自適應對話框
 * 當在行動裝置上會採用固定寬度, 有 fullScreen 跟 minWidth
 */
export const ResponsiveDailog = React.forwardRef(
	({ fullScreen = false, mobileWidth, ...rest }, ref) => {
		const { mobile } = useResponsive();

		const isFullScreen = useMemo(() => {
			return fullScreen || (mobile && !mobileWidth);
		}, [fullScreen, mobile, mobileWidth]);

		return <DialogEx ref={ref} fullScreen={isFullScreen} {...rest} />;
	}
);
