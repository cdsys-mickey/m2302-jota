import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ButtonWrapper from "@/shared-components/ButtonWrapper";

const D041DialogEditToolbar = memo(
	forwardRef((props, ref) => {
		const { onSave, onCancel, editWorking, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
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
D041DialogEditToolbar.displayName = "D041DialogEditToolbar";
D041DialogEditToolbar.propTypes = {
	onCancel: PropTypes.func,
	onSave: PropTypes.func,
	onLoadProds: PropTypes.func,
	editWorking: PropTypes.bool,
};
export default D041DialogEditToolbar;


