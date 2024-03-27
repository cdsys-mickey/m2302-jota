import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import ResponsiveLoadingButton from "../../../../../shared-components/responsive/ResponsiveLoadingButton";
import FlexToolbar from "../../../../../shared-components/listview/toolbar/FlexToolbar";

const A01DialogEditToolbar = memo(
	forwardRef((props, ref) => {
		const { onSave, onCancel, loading, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
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
					loading={loading}
					{...rest}>
					取消
				</ResponsiveLoadingButton>
			</Fragment>
		);
	})
);
A01DialogEditToolbar.displayName = "A01DialogEditToolbar";
A01DialogEditToolbar.propTypes = {
	onCancel: PropTypes.func,
	onSave: PropTypes.func,
	loading: PropTypes.bool,
};
export default A01DialogEditToolbar;
