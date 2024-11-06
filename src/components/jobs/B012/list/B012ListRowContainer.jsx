import { B012Context } from "@/contexts/B012/B012Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import B012ListRow from "./B012ListRow";
import { BContext } from "@/contexts/B/BContext";
import { B032Context } from "@/contexts/B032/B032Context";

export const B012ListRowContainer = (props) => {
	const b = useContext(BContext);
	const b012 = useContext(b.forNew ? B032Context : B012Context);
	const { isItemLoading } = b012;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => b012.listData[index], [b012.listData, index]);

	return (
		<B012ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => b012.handleSelect(e, value)}
			handleSelectDate={(e) => b012.handleSelectDate(e, value)}
			{...rest}
		/>
	);
};
B012ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
B012ListRowContainer.displayName = "B012ListRowContainer";


