import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import ResponsiveLoadingButton from "@/shared-components/ButtonEx/ResponsiveLoadingButtonContainer";
import { ButtonEx } from "@/shared-components";

const A05DialogEditButtons = memo(
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
A05DialogEditButtons.displayName = "A05DialogEditButtons";
A05DialogEditButtons.propTypes = {
	onSave: PropTypes.func,
	loading: PropTypes.bool,
};
export default A05DialogEditButtons;
