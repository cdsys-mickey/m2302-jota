import { Box, Collapse, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { ControlledProdCatLPicker } from "../../picker/ControlledProdCatLPicker";
import ControlledProdCatMPicker from "../../picker/ControlledProdCatMPicker";
import ControlledProdCatSPicker from "../../picker/ControlledProdCatSPicker";

const A22GridForm2 = memo((props) => {
	const { expanded, cat, safeQty } = props;
	return (
		<Collapse in={expanded}>
			<Box mt={1}>
				<Grid container spacing={1}>
					{cat && (
						<>
							<Grid item xs={12} sm={12} md={3}>
								<ControlledProdCatLPicker name="catL" />
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<ControlledProdCatMPicker name="catM" />
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<ControlledProdCatSPicker name="catS" />
							</Grid>
						</>
					)}
				</Grid>
			</Box>
		</Collapse>
	);
});

A22GridForm2.propTypes = {
	expanded: PropTypes.bool,
	cat: PropTypes.bool,
	safeQty: PropTypes.bool,
};

A22GridForm2.displayName = "A22GridForm2";
export default A22GridForm2;
