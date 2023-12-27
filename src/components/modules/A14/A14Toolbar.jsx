import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A14LockRowsSwitchContainer } from "./A14LockRowsSwitchContainer";

const A14Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<Container maxWidth="xs">
				<InlineListViewToolbar
					ref={ref}
					RightComponent={A14LockRowsSwitchContainer}
					{...rest}
				/>
			</Container>
		);
	})
);

A14Toolbar.propTypes = {};

A14Toolbar.displayName = "A14Toolbar";
export default A14Toolbar;
