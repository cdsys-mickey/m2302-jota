import ProdTypeAPicker from "@/components/picker/ProdTypeAPicker";
import TaxTypePickerContainer from "@/components/picker/TaxTypePickerContainer";
import FlexBox from "@/shared-components/FlexBox";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import { Box, Collapse, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import ProdCatLPicker from "../../picker/ProdCatLPicker";
import ProdCatMPicker from "../../picker/ProdCatMPicker";
import ProdCatSPicker from "../../picker/ProdCatSPicker";
import ProdTypeBPicker from "../../picker/ProdTypeBPicker";

const ProdGridForm2 = memo((props) => {
	const { expanded, cat, safeQty } = props;
	return (
		<Collapse in={expanded}>
			<Box mt={1}>
				<Grid container spacing={1}>
					{cat && (
						<>
							<Grid item xs={12} sm={12} md={3}>
								<ProdCatLPicker name="catL" />
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<ProdCatMPicker name="catM" />
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<ProdCatSPicker name="catS" />
							</Grid>
						</>
					)}

					{/* ROW 3 */}
					<FlexBox fullWidth />
					<Grid item xs={12} sm={12} md={3}>
						<ProdTypeAPicker name="typeA" />
					</Grid>
					<Grid item xs={12} sm={12} md={3}>
						<ProdTypeBPicker name="typeB" />
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

ProdGridForm2.propTypes = {
	expanded: PropTypes.bool,
	cat: PropTypes.bool,
	safeQty: PropTypes.bool,
};

ProdGridForm2.displayName = "ProdGridForm2";
export default ProdGridForm2;