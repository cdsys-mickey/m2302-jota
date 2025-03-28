import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import ButtonWrapper from "@/shared-components/ButtonWrapper";

const A20DialogEditButtons = memo(
	forwardRef((props, ref) => {
		const { onSave, onCancel, loading, ...rest } = props;
		return (
			<Fragment ref={ref}>
				<ButtonWrapper
					onClick={onCancel}
					color="warning"
					variant="outlined"
					{...rest}>
					取消
				</ButtonWrapper>
				<ButtonWrapper
					onClick={onSave}
					type="submit"
					endIcon={<SendIcon />}
					color="warning"
					variant="contained"
					loading={loading}
					{...rest}>
					儲存
				</ButtonWrapper>
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
