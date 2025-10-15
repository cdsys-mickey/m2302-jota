import { Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";

import ProdPicker from "@/components/picker/ProdPicker";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import { ProdGridForm2Container } from "./ProdGridForm2Container";
import { ProdGridFormToggleButtonContainer } from "./ProdGridFormToggleButtonContainer";
import { ProdGridLoadButtonContainer } from "./ProdGridLoadButtonContainer";

const ProdGridForm = (props) => {
	const { cat = true, safeQty = false, handleSubmit, onProdChange, onProdIdChange, onProd2Change, onProdNameChange, ...rest } = props;
	return (
		<Paper component="form" onSubmit={handleSubmit} {...rest}>
			<FormBox p={1}>
				<Grid container spacing={1}>
					{/* ROW 1 */}

					<Grid item xs={3} lg={3}>
						{/* <TextFieldWrapper
							name="prodId"
							label="貨品編號"
							size="small"
							fullWidth
							clearable
						/> */}
						<ProdPicker
							name="prod"
							label="貨品編號"
							forId
							placeholder=""
							fullWidth
							disableClearable
							onTextChange={onProdIdChange}
							onChange={onProdChange}
							freeSolo
							forcePopupIcon
							disableOpenOnInput
							findByInput={false}
						// disableEnter
						/>
					</Grid>
					<Grid item xs={3} lg={3}>
						{/* <TextFieldWrapper
							name="prodName"
							label="品名規格"
							size="small"
							fullWidth
							clearable
						/> */}
						<ProdPicker
							name="prod2"
							label="品名規格"
							placeholder=""
							forName
							fullWidth
							disableClearable
							onTextChange={onProdNameChange}
							onChange={onProd2Change}
							freeSolo
							forcePopupIcon
							disableOpenOnInput
							findByInput={false}
						// disableEnter
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
	onProdIdChange: PropTypes.func,
	onProdNameChange: PropTypes.func,
	handleSubmit: PropTypes.func,
	cat: PropTypes.bool,
	safeQty: PropTypes.bool,
};

ProdGridForm.displayName = "ProdGridForm";
export default ProdGridForm;
