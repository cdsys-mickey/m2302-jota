import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import ResponsiveLoadingButton from "@/shared-components/responsive/ResponsiveLoadingButton";

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
A20DialogEditButtons.displayName = "A20DialogEditButtons";
A20DialogEditButtons.propTypes = {
	onSave: PropTypes.func,
	loading: PropTypes.bool,
};
export default A20DialogEditButtons;
