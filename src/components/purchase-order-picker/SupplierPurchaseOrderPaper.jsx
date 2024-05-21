import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Box, Grid, Paper, Typography } from "@mui/material";

export const SupplierPurchaseOrderPaper = memo(
	forwardRef((props, ref) => {
		const { children, loading = false, ...rest } = props;
		return (
			<Paper ref={ref} {...rest}>
				{!loading && (
					<Box
						px={2}
						sx={{
							borderBottom: "1px solid rgb(0,0,0,0.1)",
						}}>
						<Grid container columns={24} spacing={2}>
							<Grid item xs={24} sm={5}>
								<Typography
									variant="subtitle2"
									color="text.secondary">
									採購單號
								</Typography>
							</Grid>
							<Grid item xs={24} sm={5}>
								<Typography
									variant="subtitle2"
									color="text.secondary">
									採購日期
								</Typography>
							</Grid>
							<Grid item xs={24} sm={14}>
								<Typography
									variant="subtitle2"
									color="text.secondary">
									覆核
								</Typography>
							</Grid>
						</Grid>
					</Box>
				)}
				<Box
					sx={[
						(theme) => ({
							...(!loading && {
								"& .MuiAutocomplete-listbox": {
									marginTop: theme.spacing(-1),
								},
							}),
						}),
					]}>
					{children}
				</Box>
			</Paper>
		);
	})
);

SupplierPurchaseOrderPaper.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	loading: PropTypes.bool,
};

SupplierPurchaseOrderPaper.displayName = "SupplierPurchaseOrderPaper";
