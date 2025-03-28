import ButtonWrapper from "@/shared-components/ButtonWrapper";
import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";

const A17FormEditButtons = memo(
	forwardRef((props, ref) => {
		const { onSave, editWorking, onCancel, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				<ButtonWrapper
					responsive
					onClick={onCancel}
					variant="outlined"
					color="warning">
					取消
				</ButtonWrapper>
				<ButtonWrapper
					responsive
					onClick={onSave}
					type="submit"
					endIcon={<SendIcon />}
					color="warning"
					variant="contained"
					loading={editWorking}>
					儲存
				</ButtonWrapper>
			</Fragment>
		);
	})
);
A17FormEditButtons.displayName = "A17FormEditButtons";
A17FormEditButtons.propTypes = {
	onSave: PropTypes.func,
	onCancel: PropTypes.func,
	editWorking: PropTypes.bool,
};
export default A17FormEditButtons;
