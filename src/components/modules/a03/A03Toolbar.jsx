import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { A03LockRowsSwitchContainer } from "./A03LockRowsSwitchContainer";

const A03Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<InlineListViewToolbar
				ref={ref}
				right={<A03LockRowsSwitchContainer />}
				// right={<Switch />}
				{...rest}
			/>
		);
	})
);

A03Toolbar.propTypes = {};

A03Toolbar.displayName = "A03Toolbar";
export default A03Toolbar;
