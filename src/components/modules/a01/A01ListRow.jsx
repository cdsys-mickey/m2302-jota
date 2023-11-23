import { memo } from "react";
import {
	Box,
	Grid,
	IconButton,
	Tooltip,
	Typography,
	Skeleton,
} from "@mui/material";
import PropTypes from "prop-types";
import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import IndexColumn from "@/shared-components/listview/IndexColumn";
import A01ProdIDColumn from "./columns/A01ProdIDColumn";
import A01ProdNameColumn from "./columns/A01ProdNameColumn";

const A01ListRow = memo((props) => {
	const { index, style, value, loading } = props;

	return (
		<div style={style}>
			<HoverableListItem borderBottom>
				<HoverableListItemSecondaryAction>
					<Tooltip arrow title="編輯">
						<IconButton>
							<EditOutlinedIcon htmlColor="#000" />
						</IconButton>
					</Tooltip>
				</HoverableListItemSecondaryAction>
				<Grid
					container
					columns={24}
					sx={[
						{
							minHeight: "36px",
							alignItems: "center",
						},
					]}>
					<IndexColumn></IndexColumn>
					<A01ProdIDColumn loading={loading}>
						{value?.ProdID}
					</A01ProdIDColumn>
					<A01ProdNameColumn loading={loading}>
						{value?.ProdData}
					</A01ProdNameColumn>
				</Grid>
			</HoverableListItem>
		</div>
	);
});

A01ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A01ListRow.displayName = "A01ListRow";
export default A01ListRow;
