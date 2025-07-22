import React from "react";
import DividerEx from "@/shared-components/DividerEx";

const DialogDivider = React.forwardRef((props, ref) => {
	const { children, ...rest } = props;
	return (
		<DividerEx ref={ref} before="0" after="100%" {...rest}>
			{children}
		</DividerEx>
	);
});

export default React.memo(DialogDivider);
