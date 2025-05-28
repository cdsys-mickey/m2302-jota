import { Box, Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";

import FlexGrid from "@/shared-components/FlexGrid";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { ProdGridForm2Container } from "./ProdGridForm2Container";
import { ProdGridFormToggleButtonContainer } from "./ProdGridFormToggleButtonContainer";
import { ProdGridLoadButtonContainer } from "./ProdGridLoadButtonContainer";
import FormBox from "@/shared-components/form/FormBox";

const ProdGridForm = (props) => {
	const { cat = true, safeQty = false, handleSubmit, ...rest } = props;
	return (
		<Paper component="form" onSubmit={handleSubmit} {...rest}>
			<FormBox p={1}>
				<Grid container spacing={1}>
					{/* ROW 1 */}

					<Grid item xs={3} lg={3}>
						<TextFieldWrapper
							name="prodId"
							label="貨品編號"
							size="small"
							fullWidth
							clearable
						/>
					</Grid>
					<Grid item xs={3} lg={3}>
						<TextFieldWrapper
							name="prodName"
							label="品名規格"
							size="small"
							fullWidth
							clearable
						/>
					</Grid>
					<FlexGrid
						item
						lg={6}
						xs={5}
						justifyContent="flex-end"
						alignItems="flex-start"
						sx={{
							"& button": {
								marginLeft: "4px",
							},
						}}>
						<ProdGridLoadButtonContainer
							variant="contained"
							color="primary"
						/>
						<ProdGridFormToggleButtonContainer />
					</FlexGrid>
				</Grid>
				{/* ROW 2 */}
				<ProdGridForm2Container cat={cat} safeQty={safeQty} />
			</FormBox>
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
