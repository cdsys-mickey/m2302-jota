import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListRow from "@/shared-components/listview/ListRow";
import PropTypes from "prop-types";
import { memo } from "react";
import A01ProdIDColumn from "./columns/A01ProdIDColumn";
import A01ProdNameColumn from "./columns/A01ProdNameColumn";
import A01ClassNColumn from "./columns/A01ClassNColumn";

const A01ListRow = memo((props) => {
	const { index, value, ...rest } = props;

	return (
		<ListRow {...rest}>
			<IndexColumn title={index}></IndexColumn>
			<A01ProdIDColumn>
				{value?.ProdID}
			</A01ProdIDColumn>
			<A01ProdNameColumn>
				{value?.ProdData}
			</A01ProdNameColumn>
			<A01ClassNColumn>
				{value?.Barcode}
			</A01ClassNColumn>
			{/* <A01ClassNColumn loading={loading}>
				{value?.Clas_N}
			</A01ClassNColumn> */}
		</ListRow>
	);
});

A01ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
};

A01ListRow.displayName = "A01ListRow";
export default A01ListRow;
