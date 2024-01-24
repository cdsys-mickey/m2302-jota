import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import ResponsiveLoadingButton from "../../../../../shared-components/responsive/ResponsiveLoadingButton";

const A05DialogTitleEditButtons = memo(
	forwardRef((props, ref) => {
		const { onSave, loading, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				<ResponsiveLoadingButton
					onClick={onSave}
					type="submit"
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
A05DialogTitleEditButtons.displayName = "A05DialogTitleEditButtons";
A05DialogTitleEditButtons.propTypes = {
	onSave: PropTypes.func,
	loading: PropTypes.bool,
};
export default A05DialogTitleEditButtons;
