import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import P34BankColumn from "./columns/P34BankColumn";
import P34IDColumn from "./columns/P34IDColumn";
import P34NameColumn from "./columns/P34NameColumn";
const P34ListRow = memo((props) => {
	const { index, style, value, onClick } = props;

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
					<P34IDColumn>{value?.CarID}</P34IDColumn>
					<P34NameColumn>
						{value?.CarData}
					</P34NameColumn>
					<P34BankColumn>
						{value?.AbbrID}
					</P34BankColumn>
					{/* <P34ClassNColumn loading={loading}>
						{value?.Clas_N}
					</P34ClassNColumn> */}
				</Grid>
			</HoverableListItem>
		</div>
	);
});

P34ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
};

P34ListRow.displayName = "P34ListRow";
export default P34ListRow;

