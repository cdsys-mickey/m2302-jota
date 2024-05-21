import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import FlexBox from "../../../../../shared-components/FlexBox";

export const C03ProdGridSubtotalLabel = (props) => {
	const { name = "OrdAmt_N", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	return (
		<FlexBox inline sx={{ fontWeight: 700 }}>
			採購合計：
			<Typography color="primary" {...rest}>
				{subtotal}
			</Typography>
			{/* <FlexBox minWidth="80px" /> */}
		</FlexBox>
	);
};

C03ProdGridSubtotalLabel.propTypes = {
	name: PropTypes.string,
};

C03ProdGridSubtotalLabel.displayName = "C03ProdGridSubtotalLabel";
