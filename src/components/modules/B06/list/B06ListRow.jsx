import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import B06ProdIdColumn from "./columns/B06ProdIdColumn";
import B06ProdNameColumn from "./columns/B06ProdNameColumn";
import B06SpNameColumn from "./columns/B06SpNameColumn";
import B06PriceColumn from "./columns/B06PriceColumn";
import B06DateColumn from "./columns/B06DateColumn";
import B06InqIdColumn from "./columns/B06InqIdColumn";

const B06ListRow = memo((props) => {
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
					spacing={1}
					sx={[
						{
							minHeight: "36px",
							alignItems: "center",
						},
					]}>
					<IndexColumn title={index}></IndexColumn>
					<B06SpNameColumn loading={loading}>
						{value?.FactAbbr_N}
					</B06SpNameColumn>
					<B06ProdIdColumn loading={loading}>
						{value?.SProdID_N}
					</B06ProdIdColumn>
					<B06ProdNameColumn loading={loading}>
						{value?.SProdData_N}
					</B06ProdNameColumn>
					<B06PriceColumn loading={loading}>
						{value?.SPrice_N}
					</B06PriceColumn>
					<B06DateColumn loading={loading}>
						{value?.InqDate_N}
					</B06DateColumn>
					<B06InqIdColumn loading={loading}>
						{value?.InqID_N}
					</B06InqIdColumn>
				</Grid>
			</HoverableListItem>
		</div>
	);
});

B06ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
};

B06ListRow.displayName = "B06ListRow";
export default B06ListRow;
