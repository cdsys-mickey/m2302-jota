import { memo } from "react";
import PropTypes from "prop-types";
import ChipEx from "../ChipEx";
import { Box } from "@mui/material";

const TypoChips = memo((props) => {
	const { value, getOptionLabel, getOptionKey, sx = [], ...rest } = props;
	return (
		<Box
			sx={[
				(theme) => ({
					"& .MuiChip-root": {
						marginTop: "4px",
						marginRight: "2px",
					},
				}),
				...(Array.isArray(sx) ? sx : [sx]),
			]}>
			{value?.map((i) => (
				<ChipEx
					key={getOptionKey ? getOptionKey(i) : i}
					label={getOptionLabel ? getOptionLabel(i) : i}
					{...rest}
				/>
			))}
		</Box>
	);
});

TypoChips.propTypes = {
	value: PropTypes.array,
	getOptionLabel: PropTypes.func,
	getOptionKey: PropTypes.func,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

TypoChips.displayName = "TypoChips";
export default TypoChips;
