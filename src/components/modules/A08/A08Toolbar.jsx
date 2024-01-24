import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A08LockRowsSwitchContainer } from "./A08LockRowsSwitchContainer";
import A08PrintButtonContainer from "./A08PrintButtonContainer";

const A08Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<Container maxWidth="xs">
				<InlineListViewToolbar
					ref={ref}
					LeftComponent={A08LockRowsSwitchContainer}
					rightComponents={<A08PrintButtonContainer />}
					mb={0.5}
					{...rest}
				/>
			</Container>
		);
	})
);

A08Toolbar.propTypes = {};

A08Toolbar.displayName = "A08Toolbar";
export default A08Toolbar;
