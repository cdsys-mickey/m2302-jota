import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A13LockRowsSwitchContainer } from "./A13LockRowsSwitchContainer";

const A13Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<Container maxWidth="xs">
				<InlineListViewToolbar
					ref={ref}
					rightComponent={A13LockRowsSwitchContainer}
					{...rest}
				/>
			</Container>
		);
	})
);

A13Toolbar.propTypes = {};

A13Toolbar.displayName = "A13Toolbar";
export default A13Toolbar;
