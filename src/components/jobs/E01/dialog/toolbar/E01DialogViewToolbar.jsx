import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment, forwardRef, memo } from "react";
import E01ExportButtonContainer from "./E01ExportButtonContainer";
import E01ConvertToSalesOrderButton from "./E01ConvertToSalesOrderButton";

const E01DialogViewToolbar = memo(
	forwardRef((props, ref) => {
		const { onEdit, onDelete, onPrint, onSideDrawerOpen, onConvert, ...rest } = props;
		return (
			<Fragment ref={ref} {...rest}>
				{onPrint && (
					<>
						<E01ExportButtonContainer />
					</>
				)}
				<E01ConvertToSalesOrderButton onClick={onConvert} />
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

E01DialogViewToolbar.propTypes = {
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onPrint: PropTypes.func,
	onSideDrawerOpen: PropTypes.func,
	onConvert: PropTypes.func
};

export default E01DialogViewToolbar;


