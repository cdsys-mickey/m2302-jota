import { FlexBox } from "@/shared-components";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";

export const D041ProdGridSubtotalLabel = (props) => {
	const { name = "InAmt", ...rest } = props;
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
			進貨合計：
			<Typography color="primary" {...rest}>
				{formattedSubtotal}
			</Typography>
			{/* <FlexBox minWidth="80px" /> */}
		</FlexBox>
	);
};

D041ProdGridSubtotalLabel.propTypes = {
	name: PropTypes.string,
};

D041ProdGridSubtotalLabel.displayName = "D041ProdGridSubtotalLabel";
