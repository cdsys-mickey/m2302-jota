import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import ResponsiveLoadingButton from "@/shared-components/responsive/ResponsiveLoadingButton";

const A17FormEditButtons = memo(
	forwardRef((props, ref) => {
		const { onSave, editWorking, onCancel, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				<ResponsiveLoadingButton onClick={onCancel} variant="outlined">
					取消
				</ResponsiveLoadingButton>
				<ResponsiveLoadingButton
					onClick={onSave}
					type="submit"
					endIcon={<SendIcon />}
					color="warning"
					variant="contained"
					loading={editWorking}>
					儲存
				</ResponsiveLoadingButton>
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
