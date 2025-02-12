import SideMenu from "@/modules/SideMenu.mjs";
import ChipEx from "@/shared-components/ChipEx";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from '@mui/icons-material/Edit';
import { alpha, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import JobMenu from "./JobMenu.mjs";
import { Box } from "@mui/system";

const JobMenuItem = memo((props) => {
	const { item, type, onHeaderEdit, sx = [], ...rest } = props;

	const isHeader = useMemo(() => {
		return SideMenu.isHeader(item);
	}, [item]);

	const isCustomHeader = useMemo(() => {
		return SideMenu.isCustomHeader(item);
	}, [item]);

	const _label = useMemo(() => {
		const { JobID, JobName } = item;
		return isHeader ? JobName : [JobID, JobName].filter(Boolean).join(" ");
	}, [isHeader, item])

	const _deleteIcon = useMemo(() => {
		if (type === JobMenu.UNUSED) {
			return <AddCircleIcon />;
		}
		return null;
	}, [type])

	const secondIcon = useMemo(() => {
		if (isCustomHeader) {
			return (
				<IconButton size="small" onClick={onHeaderEdit} sx={(theme) => {
					const color = theme.palette.getContrastText(theme.palette.primary.main);
					return {
						// padding: 0,
						color: alpha(color, 0.6),
						'&:hover': {
							color: color,
						},
					}
				}}>
					<EditIcon fontSize="small" />
				</IconButton>
			)

		}
		return null;
	}, [onHeaderEdit, isCustomHeader])

	return (
		<ChipEx
			square
			label={_label}
			fullWidth
			// borderRadius={2}
			{...isHeader && {
				color: "primary"
			}}
			sx={[
				(theme) => ({

				}),
				...(Array.isArray(sx) ? sx : [sx]),
			]}
			{...rest}
			deleteIcon={_deleteIcon}
			secondIcon={secondIcon}
		/>
	);
});

JobMenuItem.propTypes = {
	item: PropTypes.object,
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	onHeaderEdit: PropTypes.func,
};

JobMenuItem.displayName = "JobField";
export default JobMenuItem;
