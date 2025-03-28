import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";

import ButtonWrapper from "@/shared-components/ButtonWrapper";
import SearchIcon from "@mui/icons-material/Search";
import F01ImportProdsDialogContainer from "./F01ImportProdsDialogContainer";

const F01DialogEditToolbar = memo(
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
				<F01ImportProdsDialogContainer />
			</Fragment>
		);
	})
);
F01DialogEditToolbar.displayName = "F01DialogEditToolbar";
F01DialogEditToolbar.propTypes = {
	onCancel: PropTypes.func,
	onSave: PropTypes.func,
	onLoadProds: PropTypes.func,
	loading: PropTypes.bool,
};
export default F01DialogEditToolbar;

