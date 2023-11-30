import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import SendIcon from "@mui/icons-material/Send";
import { Fragment, forwardRef, memo } from "react";
import PropTypes from "prop-types";

const A01DialogTitleEditButtons = memo(
	forwardRef((props, ref) => {
		const { onClick, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				<ResponsiveButton
					onClick={onClick}
					endIcon={<SendIcon />}
					color="primary"
					variant="contained">
					儲存
				</ResponsiveButton>
			</Fragment>
		);
	})
);
A01DialogTitleEditButtons.propTypes = {
	onClick: PropTypes.func,
};
export default A01DialogTitleEditButtons;
