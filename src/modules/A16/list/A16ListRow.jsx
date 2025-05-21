import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import A16IDColumn from "./columns/A16IDColumn";
import A16NameColumn from "./columns/A16NameColumn";
import { useMemo } from "react";
import A16Name2Column from "./columns/A16Name2Column";
import A16FlagColumn from "./columns/A16FlagColumn";
import ChipEx from "@/shared-components/ChipEx";

const A16ListRow = memo((props) => {
	const { index, style, value, onClick } = props;
	const { BankID, BankData_N } = value || {};

	const bank = useMemo(() => {
		return [BankID, BankData_N].filter(Boolean).join(" ");
	}, [BankData_N, BankID])

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
					<A16IDColumn>{value?.DeptID}</A16IDColumn>
					<A16Name2Column>
						{value?.AbbrName}
					</A16Name2Column>
					<A16NameColumn>
						{value?.DeptName}
					</A16NameColumn>
					<A16FlagColumn>
						{value?.HeadOffice == 1 && (<ChipEx label="總公司" severity="warning" size="small" />)}
						{value?.FlagShip == 1 && (<ChipEx label="旗艦店" severity="info" size="small" />)}
					</A16FlagColumn>
				</Grid>
			</HoverableListItem>
		</div>
	);
});

A16ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
};

A16ListRow.displayName = "A16ListRow";
export default A16ListRow;

