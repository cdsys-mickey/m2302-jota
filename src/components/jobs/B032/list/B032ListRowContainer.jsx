import { B032Context } from "@/contexts/B032/B032Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import B032ListRow from "./B032ListRow";

export const B032ListRowContainer = (props) => {
	const b032 = useContext(B032Context);
	const { isItemLoading } = b032;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => b032.listData[index], [b032.listData, index]);

	return (
		<B032ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => b032.handleSelect(e, value)}
			handleSelectDate={(e) => b032.handleSelectDate(e, value)}
			{...rest}
		/>
	);
};
B032ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
B032ListRowContainer.displayName = "B032ListRowContainer";



