import { Box, Collapse, Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";

import { ProdGridLoadButtonContainer } from "./ProdGridLoadButtonContainer";
import FlexGrid from "../../../shared-components/FlexGrid";
import { ProdGridFormToggleButtonContainer } from "./ProdGridFormToggleButtonContainer";
import { ProdGridForm2Container } from "./ProdGridForm2Container";

const ProdGridForm = (props) => {
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
						<ProdGridLoadButtonContainer />
						<ProdGridFormToggleButtonContainer />
					</FlexGrid>
				</Grid>
				{/* ROW 2 */}
				<ProdGridForm2Container cat={cat} safeQty={safeQty} />
			</Box>
		</Paper>
	);
};

ProdGridForm.propTypes = {
	handleSubmit: PropTypes.func,
	cat: PropTypes.bool,
	safeQty: PropTypes.bool,
};

ProdGridForm.displayName = "ProdGridForm";
export default ProdGridForm;
