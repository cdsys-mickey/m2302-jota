import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import { Collapse, Grid, Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import FlexBox from "@/shared-components/FlexBox";
import ProdCatLPickerContainer from "@/components/picker/ProdCatLPickerContainer";
import ProdCatMPickerContainer from "@/components/picker/ProdCatMPickerContainer";
import ProdCatSPickerContainer from "@/components/picker/ProdCatSPickerContainer";
import ProdTypeAPickerContainer from "@/components/picker/ProdTypeAPickerContainer";
import ProdTypeBPickerContainer from "@/components/picker/ProdTypeBPickerContainer";
import TaxTypePickerContainer from "@/components/picker/TaxTypePickerContainer";

const A011Form2 = memo((props) => {
	const { expanded, cat, safeQty } = props;
	return (
		<Collapse in={expanded}>
			<Box mt={1}>
				<Grid container spacing={1}>
					{cat && (
						<>
							<Grid item xs={12} sm={12} md={3}>
								<ProdCatLPickerContainer name="catL" />
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<ProdCatMPickerContainer name="catM" />
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<ProdCatSPickerContainer name="catS" />
							</Grid>
						</>
					)}

					{/* ROW 3 */}
					<FlexBox fullWidth />
					<Grid item xs={12} sm={12} md={3}>
						<ProdTypeAPickerContainer name="typeA" />
					</Grid>
					<Grid item xs={12} sm={12} md={3}>
						<ProdTypeBPickerContainer name="typeB" />
					</Grid>
					<Grid item xs={12} sm={12} md={3}>
						<TaxTypePickerContainer name="taxType" label="稅別" />
					</Grid>
					{safeQty && (
						<Grid item xs={12} sm={12} md={3}>
							<ControlledTextField
								name="safeQty"
								label="安全存量"
								type="number"
								size="small"
							/>
						</Grid>
					)}
				</Grid>
			</Box>
		</Collapse>
	);
});

A011Form2.propTypes = {
	expanded: PropTypes.bool,
	cat: PropTypes.bool,
	safeQty: PropTypes.bool,
};

A011Form2.displayName = "A011Form2";
export default A011Form2;
