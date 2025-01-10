import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import ResponsiveLoadingButton from "@/shared-components/button/ResponsiveLoadingButton";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";

const A16DialogEditButtons = memo(
	forwardRef((props, ref) => {
		const { onSave, onCancel, loading, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				<ButtonWrapper
					responsive
					onClick={onCancel}
					color="warning"
					variant="outlined"
					// loading={loading}
					{...rest}>
					取消
				</ButtonWrapper>
				<ButtonWrapper
					responsive
					onClick={onSave}
					type="submit"
					endIcon={<SendIcon />}
					color="warning"
					variant="contained"
					loading={loading}>
					儲存
				</ButtonWrapper>
			</Fragment>
		);
	})
);
A16DialogEditButtons.displayName = "A16DialogEditButtons";
A16DialogEditButtons.propTypes = {
	onSave: PropTypes.func,
	loading: PropTypes.bool,
};
export default A16DialogEditButtons;

