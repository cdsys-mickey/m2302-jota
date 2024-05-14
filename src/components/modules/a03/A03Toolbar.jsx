import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import A03PrintButtonContainer from "./A03PrintButtonContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import { A03LockSwitchContainer } from "./A03LockSwitchContainer";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";
import { Grid } from "@mui/material";
import Colors from "../../../modules/md-colors";

const A03Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="lg" alignLeft>
				{/* <Grid container spacing={1}>
					<Grid item xs={12} sm={6} md={4}> */}
				<FlexToolbar
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					borderRadius={1}
					// leftComponents={
					// 	<>
					// 		<A03PrintButtonContainer />
					// 		<A03LockSwitchContainer />
					// 	</>
					// }
					LeftComponent={A03PrintButtonContainer}
					RightComponent={A03LockSwitchContainer}
					{...rest}
				/>
				{/* </Grid>
				</Grid> */}
			</ContainerEx>
		);
	})
);

A03Toolbar.propTypes = {};

A03Toolbar.displayName = "A03Toolbar";
export default A03Toolbar;
