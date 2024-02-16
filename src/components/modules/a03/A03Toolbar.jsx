import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { A03LockRowsSwitchContainer } from "./A03LockRowsSwitchContainer";
import { Container } from "@mui/material";

const A03Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<Container maxWidth="lg">
				<InlineListViewToolbar
					ref={ref}
					LeftComponent={A03LockRowsSwitchContainer}
					// right={<Switch />}
					{...rest}
				/>
			</Container>
		);
	})
);

A03Toolbar.propTypes = {};

A03Toolbar.displayName = "A03Toolbar";
export default A03Toolbar;
