import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton, Tooltip } from "@mui/material";

const A16DialogTitleViewButtons = memo(
	forwardRef((props, ref) => {
		const { onEdit, onDelete, onSideDrawerOpen, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				{onDelete && (
					<ResponsiveButton
						startIcon={<HighlightOffIcon />}
						color="secondary"
						onClick={onDelete}>
						刪除
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

				<Tooltip title="詳細資訊">
					<IconButton onClick={onSideDrawerOpen} size="small">
						<HelpOutlineIcon />
					</IconButton>
				</Tooltip>
			</Fragment>
		);
	})
);

A16DialogTitleViewButtons.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onSideDrawerOpen: PropTypes.func,
};

export default A16DialogTitleViewButtons;
