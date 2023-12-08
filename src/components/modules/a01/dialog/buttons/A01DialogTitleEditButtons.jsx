import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import SendIcon from "@mui/icons-material/Send";
import { Fragment, forwardRef, memo } from "react";
import PropTypes from "prop-types";
import ResponsiveLoadingButton from "../../../../../shared-components/responsive/ResponsiveLoadingButton";

const A01DialogTitleEditButtons = memo(
	forwardRef((props, ref) => {
		const { onSave, loading, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				<ResponsiveLoadingButton
					onClick={onSave}
					endIcon={<SendIcon />}
					color="primary"
					variant="contained"
					loading={loading}>
					儲存
				</ResponsiveLoadingButton>
			</Fragment>
		);
	})
);
A01DialogTitleEditButtons.displayName = "A01DialogTitleEditButtons";
A01DialogTitleEditButtons.propTypes = {
	onSave: PropTypes.func,
	loading: PropTypes.bool,
};
export default A01DialogTitleEditButtons;
