import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ButtonWrapper from "@/shared-components/ButtonWrapper";

const C07DialogEditToolbar = memo(
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
					<ButtonWrapper
						responsive
						onClick={onRefresh}
						type="button"
						endIcon={<AutorenewIcon />}
						color="info"
						variant="contained"
						loading={refreshWorking}>
						更新單價
					</ButtonWrapper>
				)}
				<ButtonWrapper
					responsive
					onClick={onCancel}
					color="warning"
					variant="outlined"
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
					loading={editWorking}>
					儲存
				</ButtonWrapper>
			</Fragment>
		);
	})
);
C07DialogEditToolbar.displayName = "C07DialogEditToolbar";
C07DialogEditToolbar.propTypes = {
	onCancel: PropTypes.func,
	onSave: PropTypes.func,
	onRefresh: PropTypes.func,
	onLoadProds: PropTypes.func,
	refreshWorking: PropTypes.bool,
	editWorking: PropTypes.bool,
};
export default C07DialogEditToolbar;
