import FlexBox from "@/shared-components/FlexBox";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";

export const C09ProdGridSubtotalLabel = (props) => {
	const { name = "TxiAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	return (
		<FlexBox inline sx={{ fontWeight: 700 }}>
			撥入合計：
			<Typography color="primary" {...rest}>
				{subtotal}
			</Typography>
			{/* <FlexBox minWidth="80px" /> */}
		</FlexBox>
	);
};

C09ProdGridSubtotalLabel.propTypes = {
	name: PropTypes.string,
};

C09ProdGridSubtotalLabel.displayName = "C09ProdGridSubtotalLabel";
