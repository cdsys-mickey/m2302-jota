import { B031Context } from "@/contexts/B031/B031Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import B031ListRow from "./B031ListRow";

export const B031ListRowContainer = (props) => {
	const b031 = useContext(B031Context);
	const { isItemLoading } = b031;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => b031.listData[index], [b031.listData, index]);

	return (
		<B031ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => b031.handleSelect(e, value)}
			handleSelectDate={(e) => b031.handleSelectDate(e, value)}
			{...rest}
		/>
	);
};
B031ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
B031ListRowContainer.displayName = "B031ListRowContainer";


