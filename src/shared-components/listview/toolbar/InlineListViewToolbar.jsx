import { Box } from "@mui/material";
import React from "react";
import FlexBox from "@/shared-components/FlexBox";

const ListViewToolbarOneLinerBox = React.forwardRef((props, ref) => {
	const {
		LeftComponent,
		left,
		RightComponent,
		right,
		boxSx = [],
		...rest
	} = props;
	return (
		<FlexBox
			ref={ref}
			inline
			fullWidth
			alignItems="flex-end"
			sx={[
				{
					minHeight: "48px",
				},
				...(Array.isArray(boxSx) ? boxSx : [boxSx]),
			]}
			{...rest}>
			<FlexBox flex={1}>
				{LeftComponent && <LeftComponent />}
				{left}
			</FlexBox>
			<FlexBox>
				{RightComponent && <RightComponent />}
				{right}
			</FlexBox>
		</FlexBox>
	);
});

const InlineListViewToolbar = ({
	loading,
	LoadingComponent,
	LeftComponent,
	RightComponent,
	...rest
}) => {
	if (loading && !!LoadingComponent) {
		return <ListViewToolbarOneLinerBox RightComponent={LoadingComponent} />;
	}

	return (
		<ListViewToolbarOneLinerBox
			LeftComponent={LeftComponent}
			RightComponent={RightComponent}
			{...rest}
		/>
	);
};

export default React.memo(InlineListViewToolbar);
