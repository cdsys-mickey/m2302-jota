import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { ButtonEx } from "@/shared-components";

const C09DialogEditToolbar = memo(
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
				{onRefresh && (
					<ButtonEx
						responsive
						onClick={onRefresh}
						type="button"
						endIcon={<AutorenewIcon />}
						color="info"
						variant="contained"
						loading={refreshWorking}>
						更新單價
					</ButtonEx>
				)}
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
C09DialogEditToolbar.displayName = "C09DialogEditToolbar";
C09DialogEditToolbar.propTypes = {
	onCancel: PropTypes.func,
	onSave: PropTypes.func,
	onRefresh: PropTypes.func,
	onLoadProds: PropTypes.func,
	refreshWorking: PropTypes.bool,
	editWorking: PropTypes.bool,
};
export default C09DialogEditToolbar;
