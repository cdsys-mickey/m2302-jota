import React from "react";
import DialogTitleEx from "@/shared-components/dialog/DialogTitleEx";

const PopperTitle = (props) => {
	const { children, ...rest } = props;

	return (
		<DialogTitleEx padding="0 0 16px 0" {...rest}>
			{children}
		</DialogTitleEx>
	);
};

export default React.memo(PopperTitle);
