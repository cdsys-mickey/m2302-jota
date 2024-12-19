import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import TypographyEx from "@/shared-components/typography/TypographyEx";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import A20IDColumn from "./columns/A20IDColumn";
import A20NameColumn from "./columns/A20NameColumn";
import ListRow from "@/shared-components/listview/ListRow";

const A20ListRow = memo((props) => {
	const { index, value, ...rest } = props;

	return (
		<ListRow {...rest}>
			<IndexColumn title={index}></IndexColumn>
			<A20IDColumn>{value?.ProdID}</A20IDColumn>
			<A20NameColumn >
				{/* {value?.ProdData || "(無對應名稱)"} */}
				<TypographyEx emptyText="(空白)">
					{value?.ProdData}
				</TypographyEx>
			</A20NameColumn>
		</ListRow>
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
