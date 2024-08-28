import { Box, Collapse, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import ProdCatLPicker from "../../picker/ProdCatLPicker";
import ProdCatMPicker from "../../picker/ProdCatMPicker";
import ProdCatSPicker from "../../picker/ProdCatSPicker";

const A22GridForm2 = memo((props) => {
	const { expanded, cat, safeQty } = props;
	return (
		<Collapse in={expanded}>
			<Box mt={1}>
				<Grid container spacing={1}>
					{cat && (
						<>
							<Grid item xs={12} sm={12} md={3}>
								<ProdCatLPicker name="catL" disableOpenOnInput selectOnFocus />
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<ProdCatMPicker name="catM" disableOpenOnInput selectOnFocus />
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<ProdCatSPicker name="catS" disableOpenOnInput selectOnFocus />
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
