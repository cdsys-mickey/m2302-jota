import { B011Context } from "@/contexts/B011/B011Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import B011ListRow from "./B011ListRow";
import { B031Context } from "@/contexts/B031/B031Context";
import { BContext } from "@/contexts/B/BContext";

export const B011ListRowContainer = (props) => {
	const { index, forNew = false, ...rest } = props;
	const b = useContext(BContext);
	const b011 = useContext(b.forNew ? B031Context : B011Context);
	const { isItemLoading } = b011;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => b011.listData[index], [b011.listData, index]);

	return (
		<B011ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => b011.handleSelect(e, value)}
			handleSelectDate={(e) => b011.handleSelectDate(e, value)}
			{...rest}
		/>
	);
};
B011ListRowContainer.propTypes = {
	forNew: PropTypes.bool,
	index: PropTypes.number,
	data: PropTypes.object,
};
B011ListRowContainer.displayName = "B011ListRowContainer";

