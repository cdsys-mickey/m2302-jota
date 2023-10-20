import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";

const SupplierLabel = memo(
	forwardRef((props, ref) => {
		const { value, ...rest } = props;
		return (
			<div ref={ref} {...rest}>
				<Grid container columns={12} spacing={1}>
					<Grid item xs={12} sm={12} md={3}>
						<FormFieldLabel>
							{value?.id} {value?.name}
						</FormFieldLabel>
					</Grid>
					<Grid item xs={12} sm={12} md={5}>
						<FormFieldLabel>{value?.address}</FormFieldLabel>
					</Grid>
					<Grid item xs={12} sm={12} md={2}>
						<FormFieldLabel>{value?.TaxID}</FormFieldLabel>
					</Grid>
				</Grid>
			</div>
		);
	})
);

SupplierLabel.propTypes = {};

SupplierLabel.displayName = "SupplierLabel";
export default SupplierLabel;
