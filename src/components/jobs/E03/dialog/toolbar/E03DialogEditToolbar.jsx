import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";

import { ButtonEx } from "@/shared-components";
import SearchIcon from "@mui/icons-material/Search";
import E03ImportProdsDialogContainer from "./import-prods/E03ImportProdsDialogContainer";


const E03DialogEditToolbar = memo(
	forwardRef((props, ref) => {
		const { onSave, onCancel, loading, ...rest } = props;


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
					loading={loading}>
					儲存
				</ButtonEx>
				{/* 帶入商品 */}
				<E03ImportProdsDialogContainer />
			</Fragment>
		);
	})
);
E03DialogEditToolbar.displayName = "E03DialogEditToolbar";
E03DialogEditToolbar.propTypes = {
	onCancel: PropTypes.func,
	onSave: PropTypes.func,
	onLoadProds: PropTypes.func,
	loading: PropTypes.bool,
	readOnly: PropTypes.bool,
};
export default E03DialogEditToolbar;




