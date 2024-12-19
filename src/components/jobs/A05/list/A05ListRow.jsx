import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import A05IDColumn from "./columns/A05IDColumn";
import A05NameColumn from "./columns/A05NameColumn";

const A05ListRow = memo((props) => {
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
					<A05IDColumn loading={loading}>{value?.FactID}</A05IDColumn>
					<A05NameColumn loading={loading}>
						{value?.FactData}
					</A05NameColumn>
					{/* <A05ClassNColumn loading={loading}>
						{value?.Clas_N}
					</A05ClassNColumn> */}
				</Grid>
			</HoverableListItem>
		</div>
	);
});

A05ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
};

A05ListRow.displayName = "A05ListRow";
export default A05ListRow;
