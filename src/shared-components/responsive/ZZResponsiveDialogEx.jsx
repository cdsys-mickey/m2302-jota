import { forwardRef, useMemo, memo } from "react";
import DialogEx from "../dialog/DialogEx";
import useResponsive from "@/shared-contexts/responsive/useResponsive";

/**
 * 自適應對話框
 * 當在行動裝置上會採用固定寬度, 有 fullScreen 跟 minWidth
 */
const ZZResponsiveDailogEx = memo(
	forwardRef(({ ...rest }, ref) => {
		const { mobile } = useResponsive();

		const fullScreen = useMemo(() => {
			return mobile;
		}, [mobile]);

		return <DialogEx ref={ref} fullScreen={fullScreen} {...rest} />;
	})
);

export default ZZResponsiveDailogEx;
