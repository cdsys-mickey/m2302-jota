import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Grid, IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import ZA03IDColumn from "./columns/ZA03IDColumn";
import ZA03NameColumn from "./columns/ZA03NameColumn";

const ZA03ListRow = memo((props) => {
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
					<ZA03IDColumn loading={loading}>
						{value?.LoginName}
					</ZA03IDColumn>
					<ZA03NameColumn loading={loading}>
						{value?.UserName}
					</ZA03NameColumn>
					{/* <ZA03ClassNColumn loading={loading}>
						{value?.Clas_N}
					</ZA03ClassNColumn> */}
				</Grid>
			</HoverableListItem>
		</div>
	);
});

ZA03ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
};

ZA03ListRow.displayName = "ZA03ListRow";
export default ZA03ListRow;
