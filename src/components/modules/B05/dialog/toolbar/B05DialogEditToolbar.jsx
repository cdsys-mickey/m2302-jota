import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import ResponsiveLoadingButton from "@/shared-components/responsive/ResponsiveLoadingButton";
import B05LoadProdsDialogContainer from "./B05LoadProdsDialogContainer";
import SearchIcon from "@mui/icons-material/Search";

const B05DialogEditToolbar = memo(
	forwardRef((props, ref) => {
		const { onLoadProds, onSave, onCancel, loading, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				<ResponsiveLoadingButton
					onClick={onLoadProds}
					endIcon={<SearchIcon />}
					color="warning"
					variant="outlined">
					載入商品
				</ResponsiveLoadingButton>
				<ResponsiveLoadingButton
					onClick={onSave}
					type="submit"
					endIcon={<SendIcon />}
					color="warning"
					variant="contained"
					loading={loading}>
					儲存
				</ResponsiveLoadingButton>
				<ResponsiveLoadingButton
					onClick={onCancel}
					color="neutral"
					variant="contained"
					{...rest}>
					取消
				</ResponsiveLoadingButton>
				{/* 載入商品 */}
				<B05LoadProdsDialogContainer />
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
