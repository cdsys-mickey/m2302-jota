import { memo } from "react";
import HoverableListItem from "../HoverableListItem";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";

const ListRow = memo((props) => {
	const { children, index, style, value, onClick, ...rest } = props;
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
					{children}
				</Grid>
			</HoverableListItem>
		</div>
	);
})

ListRow.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,

}

ListRow.displayName = "ListRow";
export default ListRow;