import FlexBox from "@/shared-components/FlexBox";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";

export const C05ProdGridSubtotalLabel = (props) => {
	const { name = "RtAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	return (
		<FlexBox inline sx={{ fontWeight: 700 }}>
			退貨合計：
			<Typography color="primary" {...rest}>
				{subtotal}
			</Typography>
			{/* <FlexBox minWidth="80px" /> */}
		</FlexBox>
	);
};

C05ProdGridSubtotalLabel.propTypes = {
	name: PropTypes.string,
};

C05ProdGridSubtotalLabel.displayName = "C05ProdGridSubtotalLabel";
