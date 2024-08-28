import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Box, Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";

import FlexGrid from "@/shared-components/FlexGrid";
import ProdPicker from "@/components/picker/ProdPicker";
import { A22GridForm2Container } from "./A22GridForm2Container";
import { A22GridFormToggleButtonContainer } from "./A22GridFormToggleButtonContainer";
import { A22GridLoadButtonContainer } from "./A22GridLoadButtonContainer";

const A22GridForm = (props) => {
	const { cat = true, safeQty = false, onSubmit, ...rest } = props;
	return (
		<Paper component="form" onSubmit={onSubmit} {...rest}>
			<Box p={1}>
				<Grid container spacing={1} columns={24}>
					{/* ROW 1 */}

					<Grid item xs={24} sm={12} md={16} lg={7}>
						{/* <OptionPickerProvider> */}
						<ProdPicker
							name="prod1"
							label="起始商品編號"
							size="small"
							filterByServer
							queryRequired
							// virtualize
							typeToSearchText="以編號,條碼或名稱搜尋"
							optionLabelSize="md"
							disableOpenOnInput
							selectOnFocus
						/>
						{/* </OptionPickerProvider> */}
					</Grid>
					<Grid item xs={24} sm={12} md={16} lg={7}>
						<ProdPicker
							name="prod2"
							label="截止商品編號"
							size="small"
							filterByServer
							queryRequired
							typeToSearchText="以編號,條碼或名稱搜尋"
							optionLabelSize="md"
							disableOpenOnInput
							selectOnFocus
						/>
					</Grid>
					<Grid item lg={4}>
						<TextFieldWrapper
							name="qty"
							label="張數"
							type="number"
							size="small"
						/>
					</Grid>
					<FlexGrid
						item
						xs={24}
						sm={12}
						md={16}
						lg={6}
						justifyContent="flex-end"
						alignItems="flex-start"
						sx={{
							"& button": {
								marginLeft: "4px",
							},
						}}>
						<A22GridLoadButtonContainer />
						<A22GridFormToggleButtonContainer />
					</FlexGrid>
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
