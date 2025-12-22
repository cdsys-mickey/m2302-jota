import { FlexBox } from "@/shared-components";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";

export const DSGToolbarLabel = (props) => {
	const { label = "(LabelName)", name = "TxoAmt", delimiter = "：", sx = [], ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	const formattedSubtotal = useMemo(() => {
		return !isNaN(subtotal) && subtotal !== ""
			? parseFloat(subtotal).toFixed(2)
			: "0.00";
	}, [subtotal]);

	const _label = useMemo(() => {
		return label ? `${label}${delimiter}` : "";
	}, [delimiter, label])

	return (
		<FlexBox inline sx={[
			() => ({
				fontWeight: 700
			}),
			...(Array.isArray(sx) ? sx : [sx]),
		]}>
			{_label}
			<Typography color="primary" {...rest}>
				{formattedSubtotal}
			</Typography>
		</FlexBox>
	);
};

DSGToolbarLabel.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	delimiter: PropTypes.string,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

DSGToolbarLabel.displayName = "DSGToolbarLabel";
