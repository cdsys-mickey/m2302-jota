import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import { C03OutputModePickerContainer } from "./C03OutputModePickerContainer";
import C03PrintButtonContainer from "./C03PrintButtonContainer";

const C03DialogViewToolbar = memo(
	forwardRef((props, ref) => {
		const { onEdit, onDelete, onReview, onReject, onPrint, ...rest } =
			props;
		return (
			<Fragment ref={ref} {...rest}>
				{onPrint && (
					<>
						<C03OutputModePickerContainer />
						<C03PrintButtonContainer />
					</>
				)}

				{onDelete && (
					<ResponsiveButton
						startIcon={<HighlightOffIcon />}
						color="secondary"
						onClick={onDelete}>
						刪除
					</ResponsiveButton>
				)}

				{onReview && (
					<ResponsiveButton
						startIcon={<CheckCircleOutlineIcon />}
						color="success"
						onClick={onReview}>
						覆核
					</ResponsiveButton>
				)}
				{onReject && (
					<ResponsiveButton
						startIcon={<HighlightOffIcon />}
						color="warning"
						onClick={onReject}>
						解除覆核
					</ResponsiveButton>
				)}

				{onEdit && (
					<ResponsiveButton
						startIcon={<EditOutlinedIcon />}
						color="primary"
						onClick={onEdit}>
						編輯
					</ResponsiveButton>
				)}
			</Fragment>
		);
	})
);

C03DialogViewToolbar.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onReview: PropTypes.func,
	onReject: PropTypes.func,
	onPrint: PropTypes.func,
};

export default C03DialogViewToolbar;
