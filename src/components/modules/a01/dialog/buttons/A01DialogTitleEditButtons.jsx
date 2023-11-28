import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import SendIcon from "@mui/icons-material/Send";
import { Fragment, forwardRef, memo } from "react";

const A01DialogTitleEditButtons = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
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
	})
);

export default A01DialogTitleEditButtons;
