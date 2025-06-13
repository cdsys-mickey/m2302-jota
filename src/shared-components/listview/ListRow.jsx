import { Grid } from "@mui/material";
import { pink } from "@mui/material/colors";
import PropTypes from "prop-types";
import { memo } from "react";
import HoverableListItem from "../HoverableListItem";

const ListRow = memo((props) => {
	const { children, flex = true, selectText = true, style, value, checked, onClick, ...rest } = props;
	return (
		<div style={style}>
			<HoverableListItem borderBottom onClick={onClick}
				selected={checked}
				sx={[
					(theme) => ({
						backgroundColor: "transparent",
						"&:hover .hover-to-show": {
							display: flex ? "flex" : "block",
						},
						...(checked && {
							backgroundColor: pink[50]
						}),
						transition: theme.transitions.create("backgroundColor", {
							easing: theme.transitions.easing.sharp,
							duration: theme.transitions.duration.enteringScreen,
						}),
						...(!selectText && {
							userSelect: "none"
						})
					})
				]}
			>
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