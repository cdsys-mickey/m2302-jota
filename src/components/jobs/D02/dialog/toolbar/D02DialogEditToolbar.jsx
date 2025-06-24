import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { ButtonEx } from "@/shared-components";

const D02DialogEditToolbar = memo(
	forwardRef((props, ref) => {
		const { onSave, onCancel, editWorking, ...rest } = props;
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
D02DialogEditToolbar.displayName = "D02DialogEditToolbar";
D02DialogEditToolbar.propTypes = {
	onCancel: PropTypes.func,
	onSave: PropTypes.func,
	onLoadProds: PropTypes.func,
	editWorking: PropTypes.bool,
};
export default D02DialogEditToolbar;

