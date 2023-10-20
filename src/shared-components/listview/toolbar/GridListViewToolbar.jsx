import { Grid } from "@mui/material";
import React from "react";
import FlexBox from "@/shared-components/FlexBox";

const GridListViewToolbarBox = ({
	LeftComponent,
	left,
	RightComponent,
	right,
	boxSx,
	xl = [6, 6],
	lg = [6, 6],
	md = [6, 6],
	sm = [12, 12],
	xs = [12, 12],
	...rest
}) => {
	return (
		<FlexBox
			sx={[
				{
					minHeight: "48px",
					alignItems: "flex-end",
				},
				...(Array.isArray(boxSx) ? boxSx : [boxSx]),
			]}
			{...rest}>
			<Grid container>
				<Grid
					item
					xl={xl[0]}
					lg={lg[0]}
					md={md[0]}
					sm={sm[0]}
					xs={xs[0]}
					sx={{
						// paddingLeft: "4px",
						display: "flex",
						alignItems: "flex-end",
					}}>
					{LeftComponent && <LeftComponent />}
					{left}
				</Grid>

				<Grid
					item
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						// alignItems: "center",
						// paddingRight: "4px",
					}}
					xl={xl[1]}
					lg={lg[1]}
					md={md[1]}
					sm={sm[1]}
					xs={xs[1]}>
					<FlexBox alignItems="flex-end">
						{RightComponent && <RightComponent />}
						{right}
					</FlexBox>
				</Grid>
			</Grid>
		</FlexBox>
	);
};

const GridListViewToolbar = ({
	loading,
	LoadingComponent,
	LeftComponent,
	RightComponent,
	...rest
}) => {
	if (loading && !!LoadingComponent) {
		return <GridListViewToolbarBox RightComponent={LoadingComponent} />;
	}

	return (
		<GridListViewToolbarBox
			LeftComponent={LeftComponent}
			RightComponent={RightComponent}
			{...rest}
		/>
	);
};

export default React.memo(GridListViewToolbar);
