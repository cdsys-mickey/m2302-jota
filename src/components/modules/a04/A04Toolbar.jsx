import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A04LockRowsSwitchContainer } from "./A04LockRowsSwitchContainer";
import A04PrintButtonContainer from "./A04PrintButtonContainer";

const A04Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<Container maxWidth="sm">
				<InlineListViewToolbar
					ref={ref}
					LeftComponent={A04LockRowsSwitchContainer}
					rightComponents={<A04PrintButtonContainer />}
					mb={0.5}
					// right={<Switch />}
					{...rest}
				/>
			</Container>
		);
	})
);

A04Toolbar.propTypes = {};

A04Toolbar.displayName = "A04Toolbar";
export default A04Toolbar;
