import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import { ButtonEx, ToolbarDivider } from "@/shared-components";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Box } from "@mui/material";

const P42DialogEditButtons = memo(
	(props) => {
		const { onSave, onCancel, loading, refreshWorking, onRefresh } = props;
		return (
			<Fragment>
				<ButtonEx
					responsive
					onClick={onRefresh}
					type="submit"
					startIcon={<AutorenewIcon />}
					color="secondary"
					variant="contained"
					loading={refreshWorking}>
					佣金計算
				</ButtonEx>
				<ToolbarDivider />
				<ButtonEx
					responsive
					onClick={onCancel}
					color="warning"
					variant="outlined"
				>
					取消
				</ButtonEx>
				<ButtonEx
					responsive
					onClick={onSave}
					type="submit"
					endIcon={<SendIcon />}
					color="warning"
					variant="contained"
					loading={loading}
					tooltip="儲存 (Ctrl-Enter)">
					儲存
				</ButtonEx>
			</Fragment>
		);
	});
P42DialogEditButtons.displayName = "P42DialogEditButtons";
P42DialogEditButtons.propTypes = {
	onSave: PropTypes.func,
	onCancel: PropTypes.func,
	onRefresh: PropTypes.func,
	loading: PropTypes.bool,
	refreshWorking: PropTypes.bool,
};
export default P42DialogEditButtons;




