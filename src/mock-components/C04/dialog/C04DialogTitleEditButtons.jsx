import React, { Fragment } from "react";
import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import SaveIcon from "@mui/icons-material/Save";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SendIcon from "@mui/icons-material/Send";

const C04DialogTitleEditButtons = React.forwardRef((props, ref) => {
	const { children, ...rest } = props;
	return (
		<Fragment ref={ref} {...rest}>
			<ResponsiveButton
				endIcon={<SendIcon />}
				color="primary"
				variant="contained">
				儲存
			</ResponsiveButton>
		</Fragment>
	);
});

export default React.memo(C04DialogTitleEditButtons);
