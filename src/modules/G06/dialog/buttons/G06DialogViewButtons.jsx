import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import G06DeleteButton from "./G06DeleteButton";
import G06EditButton from "./G06EditButton";

const G06DialogTitleViewButtons = memo(
	forwardRef((props, ref) => {
		const { onEdit, onDelete, onSideDrawerOpen, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				<G06DeleteButton />
				{/* {onDelete && (
					<ResponsiveButton
						startIcon={<HighlightOffIcon />}
						color="secondary"
						onClick={onDelete}>
						刪除
					</ResponsiveButton>
				)}*/}

				<G06EditButton />
				{/*
				{onEdit && (
					<ResponsiveButton
						startIcon={<EditOutlinedIcon />}
						color="primary"
						onClick={onEdit}>
						輸入收款資料
					</ResponsiveButton>
				)} */}

				<Tooltip title="詳細資訊">
					<IconButton onClick={onSideDrawerOpen} size="small">
						<HelpOutlineIcon />
					</IconButton>
				</Tooltip>
			</Fragment>
		);
	})
);

G06DialogTitleViewButtons.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onSideDrawerOpen: PropTypes.func,
};

export default G06DialogTitleViewButtons;

