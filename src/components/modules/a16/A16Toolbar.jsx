import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A16LockRowsSwitchContainer } from "./A16LockRowsSwitchContainer";

const A16Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<Container maxWidth="md">
				<InlineListViewToolbar
					ref={ref}
					rightComponent={A16LockRowsSwitchContainer}
					// right={<Switch />}
					{...rest}
				/>
			</Container>
		);
	})
);

A16Toolbar.propTypes = {};

A16Toolbar.displayName = "A16Toolbar";
export default A16Toolbar;
