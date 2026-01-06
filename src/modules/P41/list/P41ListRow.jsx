import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import P41IDColumn from "./columns/P41IDColumn";
import P41NameColumn from "./columns/P41NameColumn";
import { useMemo } from "react";
import P41BankColumn from "./columns/P41BankColumn";
import P41GuideNameColumn from "./columns/P41GuideNameColumn";
import P41DateColumn from "./columns/P41DateColumn";
import P41FlagColumn from "./columns/P41FlagColumn";
import P41CmsColumn from "./columns/P41CmsColumn";

const P41ListRow = memo((props) => {
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
					<P41IDColumn>{value?.OrdID}</P41IDColumn>
					<P41DateColumn>
						{value?.OrdDate}
					</P41DateColumn>
					<P41DateColumn>
						{value?.ArrDate}
					</P41DateColumn>
					<P41NameColumn>
						{value?.GrpName}
					</P41NameColumn>
					{/* <P41GuideNameColumn>
						{value?.CndName}
					</P41GuideNameColumn> */}
					<P41BankColumn>
						{value?.CarData}
					</P41BankColumn>
					<P41BankColumn>
						{value?.TrvData}
					</P41BankColumn>
					<P41FlagColumn>
						{value?.CFlag}
					</P41FlagColumn>
					<P41CmsColumn>{value?.ComID}</P41CmsColumn>
				</Grid>
			</HoverableListItem>
		</div>
	);
});

P41ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
};

P41ListRow.displayName = "P41ListRow";
export default P41ListRow;



