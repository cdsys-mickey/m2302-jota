import { ButtonEx } from "@/shared-components";
import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";

const A17FormEditButtons = memo(
	forwardRef((props, ref) => {
		const { onSave, editWorking, onCancel, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				<ButtonEx
					responsive
					onClick={onCancel}
					variant="outlined"
					color="warning">
					取消
				</ButtonEx>
				<ButtonEx
					responsive
					onClick={onSave}
					type="submit"
					endIcon={<SendIcon />}
					color="warning"
					variant="contained"
					loading={editWorking}>
					儲存
				</ButtonEx>
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
