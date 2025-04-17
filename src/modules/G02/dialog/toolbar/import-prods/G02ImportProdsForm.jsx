import ProdCatLPicker from "@/components/picker/ProdCatLPicker";
import ProdCatMPicker from "@/components/picker/ProdCatMPicker";
import ProdCatSPicker from "@/components/picker/ProdCatSPicker";
import ProdTypeAPicker from "@/components/picker/ProdTypeAPicker";
import FlexBox from "@/shared-components/FlexBox";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { Box, Grid, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import ProdPicker from "@/components/picker/ProdPicker";
import { G02ImportProdsButtonContainer } from "./G02ImportProdsButtonContainer";
import RangeGroup from "@/shared-components/RangeGroup";

const G02LoadProdsForm = memo((props) => {
	const { handleSubmit, ...rest } = props;
	return (
		<form onSubmit={handleSubmit} {...rest}>
			<Box pt={1}>
				<Grid container spacing={1} columns={24}>
					<Grid item xs={24}>
						<RangeGroup legend="貨品區間"
							leftComponent={<ProdPicker
								name="sprod"
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
					<Grid item xs={24} sm={24} md={8}>
						<ProdTypeAPicker name="typeA"
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
				<ListToolbar align="right">
					<Tooltip title="shift+Enter">
						<G02ImportProdsButtonContainer
							variant="contained"
							color="primary"
						/>
					</Tooltip>
				</ListToolbar>
			</Box>
		</form>
	);
});

G02LoadProdsForm.propTypes = {
	handleSubmit: PropTypes.func,
};

G02LoadProdsForm.displayName = "G02LoadProdsForm";
export default G02LoadProdsForm;

