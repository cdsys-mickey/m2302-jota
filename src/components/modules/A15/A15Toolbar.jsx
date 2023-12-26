import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A15LockRowsSwitchContainer } from "./A15LockRowsSwitchContainer";

const A15Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<Container maxWidth="xs">
				<InlineListViewToolbar
					ref={ref}
					rightComponent={A15LockRowsSwitchContainer}
					{...rest}
				/>
			</Container>
		);
	})
);

A15Toolbar.propTypes = {};

A15Toolbar.displayName = "A15Toolbar";
export default A15Toolbar;
