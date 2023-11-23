import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A02LockRowsSwitchContainer } from "./A02LockRowsSwitchContainer";

const A02Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<Container maxWidth="xs">
				<InlineListViewToolbar
					ref={ref}
					rightComponent={A02LockRowsSwitchContainer}
					{...rest}
				/>
			</Container>
		);
	})
);

A02Toolbar.propTypes = {};

A02Toolbar.displayName = "A02Toolbar";
export default A02Toolbar;
