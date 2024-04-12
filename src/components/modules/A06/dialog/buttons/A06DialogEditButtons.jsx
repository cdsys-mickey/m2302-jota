import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import ResponsiveLoadingButton from "@/shared-components/button/ResponsiveLoadingButton";

const A06DialogEditButtons = memo(
	forwardRef((props, ref) => {
		const { onSave, onCancel, loading, ...rest } = props;
		return (
			<Fragment ref={ref}>
				<ResponsiveLoadingButton
					onClick={onSave}
					type="submit"
					endIcon={<SendIcon />}
					color="warning"
					variant="contained"
					loading={loading}
					{...rest}>
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
A06DialogEditButtons.displayName = "A06DialogEditButtons";
A06DialogEditButtons.propTypes = {
	onSave: PropTypes.func,
	loading: PropTypes.bool,
};
export default A06DialogEditButtons;
