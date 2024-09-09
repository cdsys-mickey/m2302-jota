import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import { B05OutputModePickerContainer } from "./B05OutputModePickerContainer";
import B05PrintButtonContainer from "./B05PrintButtonContainer";

const B05DialogViewToolbar = memo(
	forwardRef((props, ref) => {
		const { onEdit, onDelete, onPrint, onSideDrawerOpen, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				{onPrint && (
					<>
						<B05OutputModePickerContainer />
						<B05PrintButtonContainer />
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

B05DialogViewToolbar.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onPrint: PropTypes.func,
	onSideDrawerOpen: PropTypes.func,
};

export default B05DialogViewToolbar;
