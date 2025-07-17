import { ButtonEx } from "@/shared-components";
import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";

const ZA03DialogEditButtons = memo(
	forwardRef((props, ref) => {
		const { onSave, onCancel, loading, sx = [], ...rest } = props;
		return (
			<ListToolbar
				{...rest}
				rightComponents={
					<>
						<ButtonEx
							responsive
							onClick={onCancel}
							color="primary"
							variant="outlined"
							{...rest}>
							取消
						</ButtonEx>
						<ButtonEx
							responsive
							onClick={onSave}
							type="submit"
							endIcon={<SendIcon />}
							color="primary"
							variant="contained"
							loading={loading}>
							儲存
						</ButtonEx>
					</>
				}></ListToolbar>
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
