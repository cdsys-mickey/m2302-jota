import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import ResponsiveLoadingButton from "../../../../../shared-components/responsive/ResponsiveLoadingButton";

const A05DialogEditButtons = memo(
	forwardRef((props, ref) => {
		const { onSave, onCancel, loading, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				<ResponsiveLoadingButton
					onClick={onSave}
					type="submit"
					endIcon={<SendIcon />}
					color="warning"
					variant="contained"
					loading={loading}>
					儲存
				</ResponsiveLoadingButton>
				<ResponsiveLoadingButton
					onClick={onCancel}
					color="neutral"
					variant="contained"
					loading={loading}
					{...rest}>
					取消
				</ResponsiveLoadingButton>
			</Fragment>
		);
	})
);
A05DialogEditButtons.displayName = "A05DialogEditButtons";
A05DialogEditButtons.propTypes = {
	onSave: PropTypes.func,
	loading: PropTypes.bool,
};
export default A05DialogEditButtons;
