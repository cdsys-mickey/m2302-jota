import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import FlexBoxView from "../../../../../shared-components/ZZFlexBox/FlexBoxView";
import { useMemo } from "react";

export const C03ProdGridSubtotalLabel = (props) => {
	const { name = "OrdAmt_N", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	const formattedSubtotal = useMemo(() => {
		return !isNaN(subtotal) && subtotal !== ""
			? parseFloat(subtotal).toFixed(2)
			: "0.00";
	}, [subtotal]);

	return (
		<FlexBox inline sx={{ fontWeight: 700 }}>
			採購合計：
			<Typography color="primary" {...rest}>
				{formattedSubtotal}
			</Typography>
			{/* <FlexBox minWidth="80px" /> */}
		</FlexBox>
	);
};

C03ProdGridSubtotalLabel.propTypes = {
	name: PropTypes.string,
};

C03ProdGridSubtotalLabel.displayName = "C03ProdGridSubtotalLabel";
