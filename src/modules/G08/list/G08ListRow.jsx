import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import G08IDColumn from "./columns/G08IDColumn";
import G08AmtColumn from "./columns/G08AmtColumn";
import { useMemo } from "react";
import G08CustColumn from "./columns/G08CustColumn";
import G08FlagColumn from "./columns/G08FlagColumn";
import ChipEx from "@/shared-components/ChipEx";
import G08DateColumn from "./columns/G08DateColumn";

const G08ListRow = memo((props) => {
	const { index, style, value, onClick } = props;
	const { CustID, CustData, AbbrName } = value || {};

	const cust = useMemo(() => {
		return [CustID, AbbrName ?? CustData].filter(Boolean).join(" ");
	}, [AbbrName, CustData, CustID])

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
					<G08IDColumn>{value?.AdjID}</G08IDColumn>
					<G08DateColumn>{value?.AdjDate}</G08DateColumn>
					<G08CustColumn>
						{cust}
					</G08CustColumn>
					<G08AmtColumn>
						{value?.AdjAmt}
					</G08AmtColumn>
				</Grid>
			</HoverableListItem>
		</div>
	);
});

G08ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
};

G08ListRow.displayName = "G08ListRow";
export default G08ListRow;


