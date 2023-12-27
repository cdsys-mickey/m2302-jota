import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A12LockRowsSwitchContainer } from "./A12LockRowsSwitchContainer";

const A12Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<Container maxWidth="xs">
				<InlineListViewToolbar
					ref={ref}
					RightComponent={A12LockRowsSwitchContainer}
					{...rest}
				/>
			</Container>
		);
	})
);

A12Toolbar.propTypes = {};

A12Toolbar.displayName = "A12Toolbar";
export default A12Toolbar;
