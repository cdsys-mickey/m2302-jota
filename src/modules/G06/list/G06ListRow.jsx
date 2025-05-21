import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import G06YMColumn from "./columns/G06YMColumn";
import G06NameColumn from "./columns/G06NameColumn";
import { useMemo } from "react";
import G06CustColumn from "./columns/G06CustColumn";
import G06SessionColumn from "./columns/G06SessionColumn";

const G06ListRow = memo((props) => {
	const { index, style, value, onClick } = props;
	const { CustID, CustData, AbbrName } = value || {};

	const cust = useMemo(() => {
		return [CustID, AbbrName ?? CustData].filter(Boolean).join(" ");
	}, [AbbrName, CustData, CustID])

	return (
		<div style={style}>
			<HoverableListItem borderBottom onClick={onClick}>
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
					<G06YMColumn>{value?.AccYM}</G06YMColumn>
					<G06SessionColumn>
						{value?.Stage}
					</G06SessionColumn>
					<G06CustColumn>
						{cust}
					</G06CustColumn>
					<G06NameColumn>{value?.UpdNotes}</G06NameColumn>
				</Grid>
			</HoverableListItem>
		</div>
	);
});

G06ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
};

G06ListRow.displayName = "G06ListRow";
export default G06ListRow;

