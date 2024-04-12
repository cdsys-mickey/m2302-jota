import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";

import B05ImportProdsDialogContainer from "./B05ImportProdsDialogContainer";
import SearchIcon from "@mui/icons-material/Search";
import { ButtonWrapper } from "../../../../../shared-components/button/ButtonWrapper";

const B05DialogEditToolbar = memo(
	forwardRef((props, ref) => {
		const { onLoadProds, onSave, onCancel, loading, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				<ButtonWrapper
					responsive
					onClick={onLoadProds}
					endIcon={<SearchIcon />}
					color="warning"
					variant="outlined">
					帶入商品
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
				<ButtonWrapper
					responsive
					onClick={onCancel}
					color="neutral"
					variant="contained"
					{...rest}>
					取消
				</ButtonWrapper>
				{/* 帶入商品 */}
				<B05ImportProdsDialogContainer />
			</Fragment>
		);
	})
);
B05DialogEditToolbar.displayName = "B05DialogEditToolbar";
B05DialogEditToolbar.propTypes = {
	onCancel: PropTypes.func,
	onSave: PropTypes.func,
	onLoadProds: PropTypes.func,
	loading: PropTypes.bool,
};
export default B05DialogEditToolbar;
