import ProdTypeAPicker from "@/components/picker/ProdTypeAPicker";
import FlexBox from "@/shared-components/FlexBox";
import { Box, Collapse, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { TextFieldWrapper } from "../../../shared-components/text-field/TextFieldWrapper";
import ProdCatLPicker from "../../picker/ProdCatLPicker";
import ProdCatMPicker from "../../picker/ProdCatMPicker";
import ProdCatSPicker from "../../picker/ProdCatSPicker";
import ProdTypeBPicker from "../../picker/ProdTypeBPicker";
import TaxTypePicker from "../../picker/TaxTypePicker";

const ProdGridForm2 = memo((props) => {
	const { expanded, cat, safeQty } = props;
	return (
		<Collapse in={expanded}>
			<Box mt={1}>
				<Grid container spacing={1}>
					{cat && (
						<>
							<Grid item xs={4} md={3}>
								<ProdCatLPicker name="catL" disableOpenOnInput selectOnFocus />
							</Grid>
							<Grid item xs={4} md={3}>
								<ProdCatMPicker name="catM" disableOpenOnInput selectOnFocus />
							</Grid>
							<Grid item xs={4} md={3}>
								<ProdCatSPicker name="catS" disableOpenOnInput selectOnFocus />
							</Grid>
						</>
					)}

					{/* ROW 3 */}
					<FlexBox fullWidth />
					<Grid item xs={3} md={3}>
						{/* 品別 */}
						<ProdTypeAPicker name="typeA" disableOpenOnInput selectOnFocus />
					</Grid>
					<Grid item xs={3} md={3}>
						{/* 品類 */}
						<ProdTypeBPicker name="typeB" disableOpenOnInput selectOnFocus />
					</Grid>
					<Grid item xs={3} md={3}>
						{/* 稅別 */}
						<TaxTypePicker name="taxType" label="稅別" disableOpenOnInput selectOnFocus />
					</Grid>
					{safeQty && (
						<Grid item xs={3} md={3}>
							<TextFieldWrapper
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
