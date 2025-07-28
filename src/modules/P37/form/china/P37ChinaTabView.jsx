import CmsGroupTypes from "@/components/CmsGroupTypePicker/CmsGroupTypes.mjs";
import { RadioGroupEx } from "@/shared-components";
import FlexBox from "@/shared-components/FlexBox";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { TabPanel } from "@mui/lab";
import { Grid, InputAdornment, Radio, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import P37 from "../../P37.mjs";

const P37ChinaTabViewComponent = (props) => {
	const { editing, ...rest } = props;
	return (
		<TabPanel value={CmsGroupTypes.Types.CHINA} {...rest}>
			<RadioGroupEx name="busCmsType">
				<Grid container columns={12} spacing={1}>
					<Grid item xs={4}>
						<FlexBox justifyContent="flex-end" height="36px" alignItems="center">
							<Typography>巴士佣金為</Typography>
						</FlexBox>
					</Grid>
					<Grid item xs={4}>
						<FlexBox inline>
							<Radio
								// checked={busCmsType == 0}
								value={P37.BusCmsTypes.AMOUNT}
								disabled={!editing}
							/>
							<TextFieldWrapper
								name="ADrvCms"
								// label="巴士佣金"
								size="small"
								// dense
								disabled={!editing}
								InputProps={{
									endAdornment: <InputAdornment position="end">元</InputAdornment>,
								}}
							/>

						</FlexBox>
					</Grid>
					<Grid item xs={4}>
						<FlexBox inline>
							<Radio
								// checked={busCmsType == 1}
								value={P37.BusCmsTypes.PERCENT}
								disabled={!editing}
							/>
							<TextFieldWrapper
								name="BDrvCms"
								// label="巴士佣金"
								size="small"
								// dense
								disabled={!editing}
								InputProps={{
									endAdornment: <InputAdornment position="end">%</InputAdornment>,
								}}
							/>
						</FlexBox>
					</Grid>
					<Grid item xs={4}>
						<FlexBox justifyContent="flex-end" height="36px" alignItems="center">
							<Typography>旅行社佣金為</Typography>
						</FlexBox>
					</Grid>
					<Grid item xs={4}>
						<TextFieldWrapper
							name="ATrvCms"
							// label="旅行社佣金"
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
			</RadioGroupEx>
		</TabPanel >
	);
}

P37ChinaTabViewComponent.propTypes = {
	editing: PropTypes.bool
}
const P37ChinaTabView = memo(P37ChinaTabViewComponent);
export default P37ChinaTabView;