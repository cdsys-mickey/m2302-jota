import MuiStyles from "@/shared-modules/MuiStyles";
import { forwardRef, memo, useMemo } from "react";
import ToolbarEx from "../../ToolbarEx/ToolbarEx";

const DSGBottomToolbar = memo(
	forwardRef((props, ref) => {
		const {
			...rest
		} = props;

		const style = useMemo(() => MuiStyles.ofGridBottomToolbar(), [])

		return (
			<ToolbarEx
				{...style}
				ref={ref}
				{...rest}
			/>
		);
	})
);

DSGBottomToolbar.displayName = "DSGBottomToolbar";

export default DSGBottomToolbar;
