import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import ResponsiveLoadingButton from "@/shared-components/button/ResponsiveLoadingButton";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";

const A20DialogEditButtons = memo(
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
				<ResponsiveButton
					onClick={onCancel}
					color="neutral"
					variant="contained"
					{...rest}>
					取消
				</ResponsiveButton>
			</Fragment>
		);
	})
);
A20DialogEditButtons.displayName = "A20DialogEditButtons";
A20DialogEditButtons.propTypes = {
	onSave: PropTypes.func,
	onCancel: PropTypes.func,
	loading: PropTypes.bool,
};
export default A20DialogEditButtons;
