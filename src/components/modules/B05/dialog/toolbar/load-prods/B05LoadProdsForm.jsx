import { memo } from "react";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { ProdPickerContainer } from "../../../../../picker/ProdPickerContainer";
import ProdTypeAPicker from "../../../../../picker/ProdTypeAPicker";
import { ControlledProdCatLPicker } from "../../../../../picker/ControlledProdCatLPicker";
import ControlledProdCatMPicker from "../../../../../picker/ControlledProdCatMPicker";
import ControlledProdCatSPicker from "../../../../../picker/ControlledProdCatSPicker";
import FlexBox from "../../../../../../shared-components/FlexBox";
import FlexToolbar from "../../../../../../shared-components/listview/toolbar/FlexToolbar";

const B05LoadProdsForm = memo((props) => {
	const { handleSubmit, ...rest } = props;
	return (
		<form onSubmit={handleSubmit} {...rest}>
			<Box pt={1}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<ProdPickerContainer
							name="sprod"
							label="起始商品編號"
							size="small"
							virtualize
							// filterByServer
							// queryRequired
							typeToSearchText="以編號,條碼或名稱搜尋"
						/>
					</Grid>
					<Grid item xs={6}>
						<ProdPickerContainer
							name="eprod"
							label="截止商品編號"
							size="small"
							virtualize
							// filterByServer
							// queryRequired
							typeToSearchText="以編號,條碼或名稱搜尋"
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<ProdTypeAPicker name="typeA" />
					</Grid>
					<FlexBox fullWidth />
					<Grid item xs={12} sm={12} md={4}>
						<ControlledProdCatLPicker name="catL" />
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<ControlledProdCatMPicker name="catM" />
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<ControlledProdCatSPicker name="catS" />
					</Grid>
				</Grid>
				<FlexToolbar align="right"></FlexToolbar>
			</Box>
		</form>
	);
});

B05LoadProdsForm.propTypes = {
	handleSubmit: PropTypes.func,
};

B05LoadProdsForm.displayName = "B05LoadProdsForm";
export default B05LoadProdsForm;
