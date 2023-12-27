import { Box, Collapse, Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";

import { A011LoadButtonContainer } from "./A011LoadButtonContainer";
import FlexGrid from "../../../shared-components/FlexGrid";
import { A011FormToggleButtonContainer } from "./A011FormToggleButtonContainer";
import { A011Form2Container } from "./A011Form2Container";
import { A011LockRowsSwitchContainer } from "./A011LockRowsSwitchContainer";

const A011Form = (props) => {
	const { cat = true, safeQty = false, handleSubmit, ...rest } = props;
	return (
		<Paper component="form" onSubmit={handleSubmit} {...rest}>
			<Box p={1}>
				<Grid container spacing={1}>
					{/* ROW 1 */}

					<Grid item xs={12} sm={6} md={8} lg={3}>
						<ControlledTextField
							name="prodId"
							label="貨品編號"
							size="small"
							fullWidth
							clearable
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={8} lg={4}>
						<ControlledTextField
							name="prodName"
							label="品名規格"
							size="small"
							fullWidth
							clearable
						/>
					</Grid>
					<FlexGrid
						item
						xs={12}
						sm={6}
						md={8}
						lg={5}
						justifyContent="flex-end"
						sx={{
							"& button": {
								marginLeft: "4px",
							},
						}}>
						<A011LoadButtonContainer />
						<A011FormToggleButtonContainer />
					</FlexGrid>
				</Grid>
				{/* ROW 2 */}
				<A011Form2Container cat={cat} safeQty={safeQty} />
			</Box>
		</Paper>
	);
};

A011Form.propTypes = {
	handleSubmit: PropTypes.func,
};

A011Form.displayName = "A011Form";
export default A011Form;
