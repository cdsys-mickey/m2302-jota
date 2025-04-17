import Styles from "@/modules/Styles.mjs";
import { forwardRef, memo, useMemo } from "react";
import ListToolbar from "./ListToolbar";

const DSGBottomToolbar = memo(
	forwardRef((props, ref) => {
		const {
			...rest
		} = props;

		const style = useMemo(() => Styles.ofGridBottomToolbar(), [])

		return (
			<ListToolbar
				{...style}
				ref={ref}
				{...rest}
			/>
		);
	})
);

DSGBottomToolbar.displayName = "DSGBottomToolbar";

export default DSGBottomToolbar;
