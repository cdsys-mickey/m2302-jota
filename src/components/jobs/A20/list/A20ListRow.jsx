import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Grid, IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import A20IDColumn from "./columns/A20IDColumn";
import A20NameColumn from "./columns/A20NameColumn";
import TypographyEx from "@/shared-components/typography/TypographyEx";

const A20ListRow = memo((props) => {
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
					<A20IDColumn loading={loading}>{value?.ProdID}</A20IDColumn>
					<A20NameColumn loading={loading}>
						{/* {value?.ProdData || "(無對應名稱)"} */}
						<TypographyEx emptyText="(空白)">
							{value?.ProdData}
						</TypographyEx>
					</A20NameColumn>
					{/* <A20ClassNColumn loading={loading}>
						{value?.Clas_N}
					</A20ClassNColumn> */}
				</Grid>
			</HoverableListItem>
		</div>
	);
});

A20ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
};

A20ListRow.displayName = "A20ListRow";
export default A20ListRow;
