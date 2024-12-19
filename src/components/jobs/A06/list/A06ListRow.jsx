import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListRow from "@/shared-components/listview/ListRow";
import PropTypes from "prop-types";
import { memo } from "react";
import A06IDColumn from "./columns/A06IDColumn";
import A06NameColumn from "./columns/A06NameColumn";

const A06ListRow = memo((props) => {
	const { index, value, ...rest } = props;

	return (
		<ListRow {...rest}>
			<IndexColumn title={index}></IndexColumn>
			<A06IDColumn>
				{value?.CustID}
			</A06IDColumn>
			<A06NameColumn>
				{value?.CustData}
			</A06NameColumn>
		</ListRow>
	);
});

A06ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
};

A06ListRow.displayName = "A06ListRow";
export default A06ListRow;
