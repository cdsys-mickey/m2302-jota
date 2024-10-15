import ProdCatLPicker from "@/components/picker/ProdCatLPicker";
import ProdCatMPicker from "@/components/picker/ProdCatMPicker";
import ProdCatSPicker from "@/components/picker/ProdCatSPicker";
import ProdTypeAPicker from "@/components/picker/ProdTypeAPicker";
import FlexBox from "@/shared-components/FlexBox";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { Box, Grid, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import ProdPicker from "@/components/picker/ProdPicker";
import { E03ImportProdsButtonContainer } from "./E03ImportProdsButtonContainer";

const E03LoadProdsForm = memo((props) => {
	const { onSubmit, ...rest } = props;
	return (
		<form onSubmit={onSubmit} {...rest}>
			<Box pt={1}>
				<Grid container spacing={1} columns={24}>
					<Grid item xs={12}>
						<ProdPicker
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
						/>
					</Grid>
					<Grid item xs={12}>
						<ProdPicker
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
						/>
					</Grid>
					<Grid item xs={24} sm={24} md={12}>
						<ProdTypeAPicker name="typeA"
							disableOpenOnInput
							selectOnFocus
						// slotProps={{
						// 	paper: {
						// 		sx: {
						// 			width: 240,
						// 		},
						// 	},
						// }}
						/>
					</Grid>
					<FlexBox fullWidth />
					<Grid item xs={12} sm={12} md={8}>
						<ProdCatLPicker name="catL"
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
					<Grid item xs={12} sm={12} md={8}>
						<ProdCatMPicker name="catM"
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
					<Grid item xs={12} sm={12} md={8}>
						<ProdCatSPicker name="catS"
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
						<E03ImportProdsButtonContainer
							variant="contained"
							color="primary"
						/>
					</Tooltip>
				</FlexToolbar>
			</Box>
		</form>
	);
});

E03LoadProdsForm.propTypes = {
	onSubmit: PropTypes.func,
};

E03LoadProdsForm.displayName = "E03LoadProdsForm";
export default E03LoadProdsForm;




