import { Box, Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import CatSProvider from "../../../contexts/A03/CatSProvider";
import CatMProvider from "../../../contexts/A03/CatMProvider";
import ProdCatLPickerContainer from "../../picker/ProdCatLPickerContainer";
import ProdLCats from "../../../modules/md-prod-l-cats";
import ProdCatMPickerContainer from "../../picker/ProdCatMPickerContainer";
import ProdMCats from "../../../modules/md-prod-m-cats";
import ProdCatSPickerContainer from "../../picker/ProdCatSPickerContainer";
import ProdSCats from "../../../modules/md-prod-s-cats";
import FlexBox from "../../../shared-components/FlexBox";
import TypoProdTypeAPickerContainer from "../../picker/TypoProdTypeAPickerContainer";
import ProdTypeAPickerContainer from "../../picker/ProdTypeAPickerContainer";
import ProdTypeBPickerContainer from "../../picker/ProdTypeBPickerContainer";
import TaxTypePickerContainer from "../../picker/TaxTypePickerContainer";
import { A011LoadingButtonContainer } from "./A011LoadingButtonContainer";

const A011Form = (props) => {
	const { handleSubmit, ...rest } = props;
	return (
		<Paper component="form" onSubmit={handleSubmit} {...rest}>
			<Box p={1}>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={6} md={8} lg={4}>
						<ControlledTextField
							name="ProdID"
							label="貨品編號"
							size="small"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={8} lg={4}>
						<ControlledTextField
							name="ProdData"
							label="品名規格"
							size="small"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={8} lg={4}>
						<A011LoadingButtonContainer />
					</Grid>
					<FlexBox fullWidth />
					<Grid item xs={12} sm={12} md={4}>
						<ProdCatLPickerContainer name="catL" />
					</Grid>
					<CatMProvider>
						<Grid item xs={12} sm={12} md={4}>
							<ProdCatMPickerContainer name="catM" />
						</Grid>
						<Grid item xs={12} sm={12} md={4}>
							<CatSProvider>
								<ProdCatSPickerContainer name="catS" />
							</CatSProvider>
						</Grid>
					</CatMProvider>
					<FlexBox fullWidth />
					<Grid item xs={12} sm={12} md={4}>
						<ProdTypeAPickerContainer name="typeA" />
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<ProdTypeBPickerContainer name="typeB" />
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<TaxTypePickerContainer name="taxType" label="稅別" />
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
};

A011Form.propTypes = {
	handleSubmit: PropTypes.func,
};

A011Form.displayName = "A011Form";
export default A011Form;
