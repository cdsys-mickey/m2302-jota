import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";

const A01DialogTitleViewButtons = memo(
	forwardRef((props, ref) => {
		const { onEdit, onDelete, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				<ResponsiveButton
					startIcon={<DeleteIcon />}
					color="secondary"
					onClick={onDelete}>
					刪除
				</ResponsiveButton>
				{/* <ResponsiveButton
					startIcon={<ContentCopyIcon />}
					color="neutral">
					複製
				</ResponsiveButton> */}
				<ResponsiveButton
					startIcon={<EditOutlinedIcon />}
					color="primary"
					onClick={onEdit}>
					編輯
				</ResponsiveButton>
			</Fragment>
		);
	})
);

A01DialogTitleViewButtons.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
};

export default A01DialogTitleViewButtons;
