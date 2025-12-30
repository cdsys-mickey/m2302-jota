import AreaPicker from "@/components/jobs/A06/form/fields/AreaPicker";
import ChannelPicker from "@/components/jobs/A06/form/fields/ChannelPicker";
import CustomerPicker from "@/components/picker/CustomerPicker";
import { FlexBox } from "shared-components";
import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import RangeGroup from "@/shared-components/RangeGroup";
import { Box, Grid, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { B012ImportCustsButtonContainer } from "./B012ImportCustsButtonContainer";

const B012ImportCustsForm = memo((props) => {
	const { onSubmit, ...rest } = props;
	return (
		<form onSubmit={onSubmit} {...rest}>
			<Box pt={2}>
				<Grid container spacing={1} columns={24}>
					<Grid item xs={24} sm={24}>
						<RangeGroup legend={"客戶區間"}
							leftComponent={<CustomerPicker
								autoFocus
								name="cust"
								size="small"
								virtualize
								// forNew={forNewCustomer}
								disableOpenOnInput
								selectOnFocus
								slotProps={{
									paper: {
										sx: {
											width: 360,
										},
									},
								}}
								borderless
								placeholder="起"
							/>}
							rightComponent={<CustomerPicker
								name="cust2"
								size="small"
								virtualize
								// forNew={forNewCustomer}
								disableOpenOnInput
								selectOnFocus
								slotProps={{
									paper: {
										sx: {
											width: 360,
										},
									},
								}}
								borderless
								placeholder="迄"
							/>}
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
				<ToolbarEx align="right">
					<Tooltip title="shift+Enter">
						<B012ImportCustsButtonContainer
							variant="contained"
							color="primary"
						/>
					</Tooltip>
				</ToolbarEx>
			</Box>
		</form>
	);
});

B012ImportCustsForm.propTypes = {
	onSubmit: PropTypes.func,
};

B012ImportCustsForm.displayName = "B012ImportCustsForm";
export default B012ImportCustsForm;


