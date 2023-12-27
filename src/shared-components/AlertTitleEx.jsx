import { memo } from "react";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { AlertTitle } from "@mui/material";

const AlertTitleEx = memo((props) => {
	const { sx = [], size, ...rest } = props;
	const fontSize = useMemo(() => {
		switch (size) {
			case "large":
				return "150%";
			case "medium":
				return "120%";
			case "small":
				return null;
		}
	}, [size]);

	return (
		<AlertTitle
			sx={[
				{
					...(fontSize && {
						fontSize,
					}),
				},
				...(Array.isArray(sx) ? sx : [sx]),
			]}
			{...rest}
		/>
	);
});

AlertTitleEx.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	size: PropTypes.oneOf(["small", "medium", "large"]),
};

AlertTitleEx.displayName = "AlertTitleEx";
export default AlertTitleEx;
