import ProdPicker from "@/components/picker/ProdPicker";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { Box, Grid, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { P14ImportProdsButtonContainer } from "./P14ImportProdsButtonContainer";
import RangeGroup from "@/shared-components/RangeGroup";

const P14LoadProdsForm = memo((props) => {
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
				<ListToolbar align="right">
					<Tooltip title="shift+Enter">
						<P14ImportProdsButtonContainer
							variant="contained"
							color="primary"
						/>
					</Tooltip>
				</ListToolbar>
			</Box>
		</form>
	);
});

P14LoadProdsForm.propTypes = {
	handleSubmit: PropTypes.func,
};

P14LoadProdsForm.displayName = "P14LoadProdsForm";
export default P14LoadProdsForm;


