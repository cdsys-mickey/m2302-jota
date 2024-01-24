import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A11LockRowsSwitchContainer } from "./A11LockRowsSwitchContainer";
import A11PrintButtonContainer from "./A11PrintButtonContainer";

const A11Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<Container maxWidth="xs">
				<InlineListViewToolbar
					ref={ref}
					LeftComponent={A11LockRowsSwitchContainer}
					rightComponents={
						<A11PrintButtonContainer color="neutral" />
					}
					mb={0.5}
					{...rest}
				/>
			</Container>
		);
	})
);

A11Toolbar.propTypes = {};

A11Toolbar.displayName = "A11Toolbar";
export default A11Toolbar;
