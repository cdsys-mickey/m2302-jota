import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import { ButtonEx } from "@/shared-components";

const P35DialogEditButtons = memo(
	forwardRef((props, ref) => {
		const { onSave, onCancel, loading, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				<ButtonEx
					responsive
					onClick={onCancel}
					color="warning"
					variant="outlined"
					// loading={loading}
					{...rest}>
					取消
				</ButtonEx>
				<ButtonEx
					responsive
					onClick={onSave}
					type="submit"
					endIcon={<SendIcon />}
					color="warning"
					variant="contained"
					loading={loading}>
					儲存
				</ButtonEx>
			</Fragment>
		);
	})
);
P35DialogEditButtons.displayName = "P35DialogEditButtons";
P35DialogEditButtons.propTypes = {
	onSave: PropTypes.func,
	loading: PropTypes.bool,
};
export default P35DialogEditButtons;


