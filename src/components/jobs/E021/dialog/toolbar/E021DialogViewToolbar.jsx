import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import { E021OutputModePickerContainer } from "./E021OutputModePickerContainer";
import E021PrintButtonContainer from "./E021PrintButtonContainer";

const E021DialogViewToolbar = memo(
	forwardRef((props, ref) => {
		const { onEdit, onDelete, onPrint, onSideDrawerOpen, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				{onPrint && (
					<>
						<E021OutputModePickerContainer />
						<E021PrintButtonContainer />
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

E021DialogViewToolbar.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onPrint: PropTypes.func,
	onSideDrawerOpen: PropTypes.func,
};

export default E021DialogViewToolbar;



