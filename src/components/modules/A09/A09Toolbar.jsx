import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A09LockRowsSwitchContainer } from "./A09LockRowsSwitchContainer";

const A09Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<Container maxWidth="xs">
				<InlineListViewToolbar
					ref={ref}
					RightComponent={A09LockRowsSwitchContainer}
					{...rest}
				/>
			</Container>
		);
	})
);

A09Toolbar.propTypes = {};

A09Toolbar.displayName = "A09Toolbar";
export default A09Toolbar;
