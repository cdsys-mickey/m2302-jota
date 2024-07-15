import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Grid, IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import A06ProdIDColumn from "./columns/A06IDColumn";
import A06ProdNameColumn from "./columns/A06NameColumn";

const A06ListRow = memo((props) => {
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
					<A06ProdIDColumn loading={loading}>
						{value?.CustID}
					</A06ProdIDColumn>
					<A06ProdNameColumn loading={loading}>
						{value?.CustData}
					</A06ProdNameColumn>
					{/* <A06ClassNColumn loading={loading}>
						{value?.Clas_N}
					</A06ClassNColumn> */}
				</Grid>
			</HoverableListItem>
		</div>
	);
});

A06ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
};

A06ListRow.displayName = "A06ListRow";
export default A06ListRow;
