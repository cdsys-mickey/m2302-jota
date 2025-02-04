import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Box, Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";

import FlexGrid from "@/shared-components/FlexGrid";
import ProdPicker from "@/components/picker/ProdPicker";
import { A22GridForm2Container } from "./A22GridForm2Container";
import { A22GridFormToggleButtonContainer } from "./A22GridFormToggleButtonContainer";
import { A22GridLoadButtonContainer } from "./A22GridLoadButtonContainer";
import FlexBox from "@/shared-components/FlexBox";

const A22GridForm = (props) => {
	const { cat = true, safeQty = false, onSubmit, ...rest } = props;
	return (
		<Paper component="form" onSubmit={onSubmit} {...rest}>
			<Box p={1}>
				<Grid container spacing={1} columns={24}>
					{/* ROW 1 */}

					<Grid item xs={6} lg={6}>
						<ProdPicker
							name="prod1"
							label="起始商品編號"
							size="small"
							// filterByServer
							// queryRequired
							virtualize
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
					<Grid item xs={6} lg={6}>
						<ProdPicker
							name="prod2"
							label="截止商品編號"
							size="small"
							// filterByServer
							// queryRequired
							virtualize
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
					<Grid item xs={5} lg={3}>
						<TextFieldWrapper
							name="qty"
							label="張數"
							type="number"
							size="small"
						/>
					</Grid>
					<Grid item xs={7} lg={5}
						sx={{
							"& button": {
								marginLeft: "4px",
							},
						}}>
						<FlexBox inline justifyContent="flex-end"
							alignItems="flex-start">
							<A22GridLoadButtonContainer />
							<A22GridFormToggleButtonContainer />
						</FlexBox>
					</Grid>
				</Grid>
				{/* ROW 2 */}
				<A22GridForm2Container cat={cat} safeQty={safeQty} />
			</Box>
		</Paper>
	);
};

A22GridForm.propTypes = {
	onSubmit: PropTypes.func,
	cat: PropTypes.bool,
	safeQty: PropTypes.bool,
};

A22GridForm.displayName = "A22GridForm";
export default A22GridForm;
