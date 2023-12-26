import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A10LockRowsSwitchContainer } from "./A10LockRowsSwitchContainer";

const A10Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<Container maxWidth="xs">
				<InlineListViewToolbar
					ref={ref}
					rightComponent={A10LockRowsSwitchContainer}
					{...rest}
				/>
			</Container>
		);
	})
);

A10Toolbar.propTypes = {};

A10Toolbar.displayName = "A10Toolbar";
export default A10Toolbar;
