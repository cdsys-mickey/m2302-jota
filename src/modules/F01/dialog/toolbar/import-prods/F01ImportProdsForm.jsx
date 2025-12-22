import ProdPicker from "@/components/picker/ProdPicker";
import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { Box, Grid, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { F01ImportProdsButtonContainer } from "./F01ImportProdsButtonContainer";
import RangeGroup from "@/shared-components/RangeGroup";

const F01LoadProdsForm = memo((props) => {
	const { handleSubmit, ...rest } = props;
	return (
		<form onSubmit={handleSubmit} {...rest}>
			<Box pt={1}>
				<Grid container spacing={1} columns={24}>
					<Grid item xs={24}>
						<RangeGroup legend="貨品區間"
							leftComponent={<ProdPicker
								name="sprod"
								label="起始商品編號"
								size="small"
								virtualize
								autoFocus
								// filterByServer
								// queryRequired
								typeToSearchText="以編號,條碼或名稱搜尋"
								optionLabelSize="md"
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
							rightComponent={<ProdPicker
								name="eprod"
								label="截止商品編號"
								size="small"
								virtualize
								// filterByServer
								// queryRequired
								typeToSearchText="以編號,條碼或名稱搜尋"
								optionLabelSize="md"
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
				</Grid>
				<ToolbarEx align="right">
					<Tooltip title="shift+Enter">
						<F01ImportProdsButtonContainer
							variant="contained"
							color="primary"
						/>
					</Tooltip>
				</ToolbarEx>
			</Box>
		</form>
	);
});

F01LoadProdsForm.propTypes = {
	handleSubmit: PropTypes.func,
};

F01LoadProdsForm.displayName = "F01LoadProdsForm";
export default F01LoadProdsForm;

