import { Tooltip } from "@mui/material";
import React from "react";
import { FlexBox } from "shared-components";

/**
 * 由於 Tooltip 要求 children 必須把 ref 與 各種 event callback 都放在 dom 上,
 * Box 就算是會傳遞所有 props 到 div 仍被誤判成有誤, 此元件單純是為了不顯示錯誤
 * 訊息而製作
 */
const TooltipFlexBox = React.forwardRef(
	({ title, children, BoxProps, sx = [], ...rest }, ref) => {
		return (
			<Tooltip title={title}>
				<div ref={ref} {...rest}>
					<FlexBox
						sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
						{...BoxProps}>
						{children}
					</FlexBox>
				</div>
			</Tooltip>
		);
	}
);

export default React.memo(TooltipFlexBox);
