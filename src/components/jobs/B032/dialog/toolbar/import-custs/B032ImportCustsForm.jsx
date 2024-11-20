import AreaPicker from "@/components/jobs/A06/form/fields/AreaPicker";
import ChannelPicker from "@/components/jobs/A06/form/fields/ChannelPicker";
import CustomerPicker from "@/components/picker/CustomerPicker";
import FlexBox from "@/shared-components/FlexBox";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { Box, Grid, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { B032ImportCustsButtonContainer } from "./B032ImportCustsButtonContainer";

const B032ImportCustsForm = memo((props) => {
	const { onSubmit, ...rest } = props;
	return (
		<form onSubmit={onSubmit} {...rest}>
			<Box pt={1}>
				<Grid container spacing={1} columns={24}>
					<Grid item xs={12}>
						<CustomerPicker
							forNew
							name="cust"
							label="新客戶區間起"
							size="small"
							virtualize
							autoFocus
							// optionLabelSize="md"
							disableOpenOnInput
							selectOnFocus
							slotProps={{
								paper: {
									sx: {
										width: 360,
									},
								},
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<CustomerPicker
							forNew
							name="cust2"
							label="新客戶區間迄"
							size="small"
							virtualize
							disableOpenOnInput
							selectOnFocus
							slotProps={{
								paper: {
									sx: {
										width: 360,
									},
								},
							}}
						/>
					</Grid>
					<FlexBox fullWidth />
					<Grid item xs={24} sm={24} md={12}>
						<AreaPicker name="area"
							disableOpenOnInput
							selectOnFocus

						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<ChannelPicker name="channel"
							disableOpenOnInput
							selectOnFocus
							slotProps={{
								paper: {
									sx: {
										width: 240,
									},
								},
							}}
						/>
					</Grid>
				</Grid>
				<FlexToolbar align="right">
					<Tooltip title="shift+Enter">
						<B032ImportCustsButtonContainer
							variant="contained"
							color="primary"
						/>
					</Tooltip>
				</FlexToolbar>
			</Box>
		</form>
	);
});

B032ImportCustsForm.propTypes = {
	onSubmit: PropTypes.func,
};

B032ImportCustsForm.displayName = "B032ImportCustsForm";
export default B032ImportCustsForm;



