import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { ButtonEx } from "@/shared-components";

const C08DialogEditToolbar = memo(
	forwardRef((props, ref) => {
		const {
			onSave,
			onCancel,
			onRefresh,
			editWorking,
			refreshWorking,
			...rest
		} = props;
		return (
			<Fragment ref={ref} {...rest}>
				<ButtonEx
					responsive
					onClick={onCancel}
					color="warning"
					variant="outlined"
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
					loading={editWorking}>
					儲存
				</ButtonEx>
			</Fragment>
		);
	})
);
C08DialogEditToolbar.displayName = "C08DialogEditToolbar";
C08DialogEditToolbar.propTypes = {
	onCancel: PropTypes.func,
	onSave: PropTypes.func,
	onRefresh: PropTypes.func,
	onLoadProds: PropTypes.func,
	refreshWorking: PropTypes.bool,
	editWorking: PropTypes.bool,
};
export default C08DialogEditToolbar;
