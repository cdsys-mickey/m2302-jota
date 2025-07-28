import { memo } from "react";
import PropTypes from "prop-types";
import { TabPanel } from "@mui/lab";
import CmsGroupTypes from "@/components/CmsGroupTypePicker/CmsGroupTypes.mjs";
import { Box, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import RangeGroup from "@/shared-components/RangeGroup";
import { TextFieldEx } from "@/shared-components";
import FlexBox from "@/shared-components/FlexBox";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { useScrollable } from "@/shared-hooks/useScrollable";

const P37BusTabViewComponent = (props) => {
	const { editing, maxHeight, ...rest } = props;

	const scrollable = useScrollable({
		maxHeight,
		// alwaysShowThumb: true,
		// scrollerBackgroundColor: "transparent",
	});

	return (
		<TabPanel value={CmsGroupTypes.Types.BUS} sx={[scrollable.scroller]} {...rest}>
			<Grid container columns={12} spacing={1}>
				<Grid item xs={4}>
					<FlexBox justifyContent="flex-end" height="36px" alignItems="center">
						<Typography>該車次的平均消費在</Typography>
					</FlexBox>
				</Grid>
				<Grid item xs={4}>
					<TextFieldEx
						name="SUpCP[0]"
						// label="消費額上限"
						size="small"
						// dense
						disabled={!editing}
					/>
				</Grid>
				<Grid item xs={4}>
					<FlexBox height="36px" alignItems="center">
						<Typography>元以下</Typography>
					</FlexBox>
				</Grid>
				<Grid item xs={4}>
					<FlexBox justifyContent="flex-end" height="36px" alignItems="center">
						<Typography>巴士佣金為</Typography>
					</FlexBox>
				</Grid>
				<Grid item xs={4}>
					<TextFieldWrapper
						name="SDrvCms[0]"
						// label="巴士佣金"
						size="small"
						// dense
						disabled={!editing}
						InputProps={{
							endAdornment: <InputAdornment position="end">%</InputAdornment>,
						}}
					/>
				</Grid>
				<Grid item xs={4}>

				</Grid>
				<Grid item xs={4}>
					<FlexBox justifyContent="flex-end" height="36px" alignItems="center">
						<Typography>旅行社佣金為</Typography>
					</FlexBox>
				</Grid>
				<Grid item xs={4}>
					<TextFieldWrapper
						name="STrvCms[0]"
						// label="巴士佣金"
						size="small"
						// dense
						disabled={!editing}
						InputProps={{
							endAdornment: <InputAdornment position="end">%</InputAdornment>,
						}}
					/>
				</Grid>
				<Grid item xs={4}>

				</Grid>
			</Grid >
			<Box my={3}>
				<hr />
			</Box>
			<Grid container columns={12} spacing={1}>
				<Grid item xs={4}>
					<FlexBox justifyContent="flex-end" height="36px" alignItems="center">
						<Typography>該車次的平均消費在</Typography>
					</FlexBox>
				</Grid>
				<Grid item xs={8}>
					<RangeGroup
						legend="消費額區間"
						disabled={!editing}
						leftComponent={
							<TextFieldEx
								// typo
								name="SDnCp[1]"
								borderless
								size="small"
								fullWidth
								emptyText=""
								disabled={!editing}
							/>}
						rightComponent={
							<TextFieldEx
								// typo
								name="SUpCP[1]"
								borderless
								size="small"
								fullWidth
								emptyText=""
								disabled={!editing}
							/>}
					/>
				</Grid>
				<Grid item xs={4}>
					<FlexBox justifyContent="flex-end" height="36px" alignItems="center">
						<Typography>巴士佣金為</Typography>
					</FlexBox>
				</Grid>
				<Grid item xs={4}>
					<TextFieldEx
						// typo
						name="SDrvCms[1]"
						// label="巴士佣金"
						size="small"
						InputProps={{
							endAdornment: <InputAdornment position="end">元</InputAdornment>,
						}}
						disabled={!editing}
					/>
				</Grid>
				<Grid item xs={4}>

				</Grid>
				<Grid item xs={4}>
					<FlexBox justifyContent="flex-end" height="36px" alignItems="center">
						<Typography>旅行社佣金為</Typography>
					</FlexBox>
				</Grid>
				<Grid item xs={4}>
					<TextFieldEx
						// typo
						name="STrvCms[1]"
						// label="旅行社佣金"
						size="small"
						InputProps={{
							endAdornment: <InputAdornment position="end">元</InputAdornment>,
						}}
						disabled={!editing}
					/>
				</Grid>
				<Grid item xs={4}>

				</Grid>
			</Grid>
			<Box my={3}>
				<hr />
			</Box>
			<Grid container columns={12} spacing={1}>
				<Grid item xs={4}>
					<FlexBox justifyContent="flex-end" height="36px" alignItems="center">
						<Typography>該車次的平均消費在</Typography>
					</FlexBox>
				</Grid>
				<Grid item xs={4}>
					<TextFieldEx
						// typo
						name="SDnCp[2]"
						// label="消費額下限"
						size="small"
						disabled={!editing}
					/>
				</Grid>
				<Grid item xs={4}>
					<FlexBox height="36px" alignItems="center">
						<Typography>元以上</Typography>
					</FlexBox>
				</Grid>

				<Grid item xs={4}>
					<FlexBox justifyContent="flex-end" height="36px" alignItems="center">
						<Typography>巴士佣金為</Typography>
					</FlexBox>
				</Grid>
				<Grid item xs={4}>
					<TextFieldEx
						// typo
						name="SDrvCms[2]"
						// label="巴士佣金"
						size="small"
						InputProps={{
							endAdornment: <InputAdornment position="end">%</InputAdornment>,
						}}
						disabled={!editing}
					/>
				</Grid>
				<Grid item xs={4}>

				</Grid>
				<Grid item xs={4}>
					<FlexBox justifyContent="flex-end" height="36px" alignItems="center">
						<Typography>旅行社佣金為</Typography>
					</FlexBox>
				</Grid>
				<Grid item xs={4}>
					<TextFieldEx
						// typo
						name="STrvCms[2]"
						// label="旅行社佣金"
						size="small"
						InputProps={{
							endAdornment: <InputAdornment position="end">%</InputAdornment>,
						}}
						disabled={!editing}
					/>
				</Grid>
				<Grid item xs={4}>

				</Grid>
			</Grid>
		</TabPanel >
	);
}

P37BusTabViewComponent.propTypes = {
	editing: PropTypes.bool,
	maxHeight: PropTypes.number
}
const P37BusTabView = memo(P37BusTabViewComponent);
export default P37BusTabView;