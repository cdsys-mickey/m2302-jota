import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";

import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import SearchIcon from "@mui/icons-material/Search";
import P14ImportProdsDialogContainer from "./P14ImportProdsDialogContainer";

const P14DialogEditToolbar = memo(
	forwardRef((props, ref) => {
		const { onLoadProds, onSave, onCancel, loading, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				<ButtonWrapper
					responsive
					onClick={onLoadProds}
					endIcon={<SearchIcon />}
					color="primary"
					variant="outlined">
					帶入商品
				</ButtonWrapper>
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
					loading={loading}>
					儲存
				</ButtonWrapper>
				{/* 帶入商品 */}
				<P14ImportProdsDialogContainer />
			</Fragment>
		);
	})
);
P14DialogEditToolbar.displayName = "P14DialogEditToolbar";
P14DialogEditToolbar.propTypes = {
	onCancel: PropTypes.func,
	onSave: PropTypes.func,
	onLoadProds: PropTypes.func,
	loading: PropTypes.bool,
};
export default P14DialogEditToolbar;


