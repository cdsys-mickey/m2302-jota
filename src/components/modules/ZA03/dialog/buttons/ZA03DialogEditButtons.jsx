import ResponsiveLoadingButton from "@/shared-components/responsive/ResponsiveLoadingButton";
import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import FlexToolbar from "../../../../../shared-components/listview/toolbar/FlexToolbar";

const ZA03DialogEditButtons = memo(
	forwardRef((props, ref) => {
		const { onSave, onCancel, loading, sx = [], ...rest } = props;
		return (
			<FlexToolbar
				{...rest}
				rightComponents={
					<>
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
					</>
				}></FlexToolbar>
		);
	})
);
ZA03DialogEditButtons.displayName = "ZA03DialogEditButtons";
ZA03DialogEditButtons.propTypes = {
	onSave: PropTypes.func,
	onCancel: PropTypes.func,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
export default ZA03DialogEditButtons;
