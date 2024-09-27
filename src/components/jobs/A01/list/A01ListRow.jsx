import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Grid, IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import A01ProdIDColumn from "./columns/A01ProdIDColumn";
import A01ProdNameColumn from "./columns/A01ProdNameColumn";

const A01ListRow = memo((props) => {
	const { index, style, value, loading, onClick } = props;

	return (
		<div style={style}>
			<HoverableListItem borderBottom onClick={onClick}>
				{/* <HoverableListItemSecondaryAction>
					<Tooltip arrow title="編輯">
						<IconButton>
							<EditOutlinedIcon htmlColor="#000" />
						</IconButton>
					</Tooltip>
				</HoverableListItemSecondaryAction> */}
				<Grid
					container
					columns={24}
					sx={[
						{
							minHeight: "36px",
							alignItems: "center",
						},
					]}>
					<IndexColumn title={index}></IndexColumn>
					<A01ProdIDColumn loading={loading}>
						{value?.ProdID}
					</A01ProdIDColumn>
					<A01ProdNameColumn loading={loading}>
						{value?.ProdData}
					</A01ProdNameColumn>
					<A01ProdNameColumn loading={loading}>
						{value?.Barcode}
					</A01ProdNameColumn>
					{/* <A01ClassNColumn loading={loading}>
						{value?.Clas_N}
					</A01ClassNColumn> */}
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
	onClick: PropTypes.func,
};

A01ListRow.displayName = "A01ListRow";
export default A01ListRow;
