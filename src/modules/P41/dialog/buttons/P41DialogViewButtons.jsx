import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton, Tooltip } from "@mui/material";
import P41ConvertToEntryButton from "../toolbar/P41ConvertToEntryButton";

const P41DialogTitleViewButtons = memo(
	forwardRef((props, ref) => {
		const { onEdit, onDelete, onSideDrawerOpen, onConvert, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				<P41ConvertToEntryButton onClick={onConvert} />
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

P41DialogTitleViewButtons.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onSideDrawerOpen: PropTypes.func,
	onConvert: PropTypes.func,
};

export default P41DialogTitleViewButtons;



