import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import P42IDColumn from "./columns/P42IDColumn";
import P42GroupNameColumn from "./columns/P42GroupNameColumn";
import { useMemo } from "react";
import P42BankColumn from "./columns/P42BankColumn";
import P42GuideNameColumn from "./columns/P42GuideNameColumn";
import P42DateColumn from "./columns/P42DateColumn";

const P42ListRow = memo((props) => {
	const { index, style, value, onClick } = props;

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
					<P42IDColumn>{value?.ComID}</P42IDColumn>
					<P42DateColumn>
						{value?.SalDate}
					</P42DateColumn>
					<P42GroupNameColumn>
						{value?.GrpName}
					</P42GroupNameColumn>
					<P42BankColumn>
						{value?.CarData}
					</P42BankColumn>
					<P42BankColumn>
						{value?.TrvData}
					</P42BankColumn>
					<P42GuideNameColumn>
						{value?.CndName}
					</P42GuideNameColumn>
				</Grid>
			</HoverableListItem>
		</div>
	);
});

P42ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
};

P42ListRow.displayName = "P42ListRow";
export default P42ListRow;




