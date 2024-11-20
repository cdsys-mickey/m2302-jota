import Styles from "@/modules/md-styles";
import { forwardRef, memo, useMemo } from "react";
import FlexToolbar from "./FlexToolbar";

const DSGBottomToolbar = memo(
	forwardRef((props, ref) => {
		const {
			...rest
		} = props;

		const style = useMemo(() => Styles.ofGridBottomToolbar(), [])

		return (
			<FlexToolbar
				{...style}
				ref={ref}
				{...rest}
			/>
		);
	})
);

DSGBottomToolbar.displayName = "DSGBottomToolbar";

export default DSGBottomToolbar;
