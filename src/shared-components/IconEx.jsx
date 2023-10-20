import React from "react";

const IconEx = (props) => {
	const { inverted = false, icon, ...rest } = props;
	const Icon = icon;
	return (
		<Icon
			sx={[
				inverted && {
					color: "primary.contrastText",
				},
			]}
			{...rest}
		/>
	);
};

export default IconEx;
