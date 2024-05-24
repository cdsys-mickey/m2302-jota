import FlexBox from "@/shared-components/FlexBox";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";

export const C04ProdGridSubtotalLabel = (props) => {
	const { name = "InAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	return (
		<FlexBox inline sx={{ fontWeight: 700 }}>
			進貨合計：
			<Typography color="primary" {...rest}>
				{subtotal}
			</Typography>
			{/* <FlexBox minWidth="80px" /> */}
		</FlexBox>
	);
};

C04ProdGridSubtotalLabel.propTypes = {
	name: PropTypes.string,
};

C04ProdGridSubtotalLabel.displayName = "C04ProdGridSubtotalLabel";
