import { InfiniteLoaderContext } from "@/contexts/infinite-loader/InfiniteLoaderContext";
import Forms from "@/shared-modules/Forms.mjs";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useMemo } from "react";
import { forwardRef } from "react";
import { memo } from "react";
import { G02Context } from "./G02Context";
import { FlexBox } from "shared-components";

const G02TotalAmtLabel = memo(forwardRef((props, ref) => {
	const { ...rest } = props;

	const g02 = useContext(G02Context);

	const text = useMemo(() => {
		const total = g02.checked.reduce((sum, item) => sum + Number(item.xAmt), 0);
		return Forms.formatMoney(total);
	}, [g02.checked])



	return (
		<FlexBox inline>
			<Typography
				ref={ref}
				variant="subtitle1"
				sx={{
					display: "flex",
					alignItems: "center",
				}}
				{...rest}>
				沖銷總額：
			</Typography>
			<Typography
				ref={ref}
				variant="subtitle1"
				color="secondary"
				sx={{
					display: "flex",
					alignItems: "center",
				}}
				{...rest}>
				{text}
			</Typography>
		</FlexBox>
	);
}));

G02TotalAmtLabel.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func])
}

G02TotalAmtLabel.displayName = "G02TotalAmtLabel";
export default G02TotalAmtLabel;