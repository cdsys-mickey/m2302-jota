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
import { B05ImportProdsButtonContainer } from "./B05ImportProdsButtonContainer";

const B05LoadProdsForm = memo((props) => {
	const { handleSubmit, ...rest } = props;
	return (
		<form onSubmit={handleSubmit} {...rest}>
			<Box pt={1}>
				<Grid container spacing={1}>
					<Grid item xs={6}>
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
						/>
					</Grid>
					<Grid item xs={6}>
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
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<ProdTypeAPicker name="typeA"
							disableOpenOnInput
							selectOnFocus />
					</Grid>
					<FlexBox fullWidth />
					<Grid item xs={12} sm={12} md={6}>
						<ProdCatLPicker name="catL"
							disableOpenOnInput
							selectOnFocus />
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<ProdCatMPicker name="catM" disableOpenOnInput
							selectOnFocus />
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<ProdCatSPicker name="catS" disableOpenOnInput
							selectOnFocus />
					</Grid>
				</Grid>
				<FlexToolbar align="right">
					<Tooltip title="shift+Enter">
						<B05ImportProdsButtonContainer
							variant="contained"
							color="primary"
						/>
					</Tooltip>
				</FlexToolbar>
			</Box>
		</form>
	);
});

B05LoadProdsForm.propTypes = {
	handleSubmit: PropTypes.func,
};

B05LoadProdsForm.displayName = "B05LoadProdsForm";
export default B05LoadProdsForm;
