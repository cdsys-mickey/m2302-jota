import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";

import { ButtonEx } from "@/shared-components";
import SearchIcon from "@mui/icons-material/Search";
import B031ImportProdsDialogContainer from "./import-prods/B031ImportProdsDialogContainer";


const B031DialogEditToolbar = memo(
	forwardRef((props, ref) => {
		const { onLoadProds, onSave, onCancel, loading, ...rest } = props;


		return (
			<Fragment ref={ref} {...rest}>
				{onLoadProds && (
					<ButtonEx
						responsive
						onClick={onLoadProds}
						endIcon={<SearchIcon />}
						color="primary"
						variant="outlined">
						帶入商品
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
					loading={loading}>
					儲存
				</ButtonEx>
				{/* 帶入商品 */}
				<B031ImportProdsDialogContainer />
			</Fragment>
		);
	})
);
B031DialogEditToolbar.displayName = "B031DialogEditToolbar";
B031DialogEditToolbar.propTypes = {
	onCancel: PropTypes.func,
	onSave: PropTypes.func,
	onLoadProds: PropTypes.func,
	loading: PropTypes.bool,
	readOnly: PropTypes.bool,
};
export default B031DialogEditToolbar;


