import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A11LockRowsSwitchContainer } from "./A11LockRowsSwitchContainer";

const A11Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<Container maxWidth="xs">
				<InlineListViewToolbar
					ref={ref}
					RightComponent={A11LockRowsSwitchContainer}
					{...rest}
				/>
			</Container>
		);
	})
);

A11Toolbar.propTypes = {};

A11Toolbar.displayName = "A11Toolbar";
export default A11Toolbar;
