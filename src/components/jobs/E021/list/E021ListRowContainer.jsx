import { E021Context } from "@/contexts/E021/E021Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import E021ListRow from "./E021ListRow";

export const E021ListRowContainer = (props) => {
	const e021 = useContext(E021Context);
	const { isItemLoading } = e021;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => e021.listData[index], [e021.listData, index]);

	return (
		<E021ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => e021.handleSelect(e, value)}
			{...rest}
		/>
	);
};
E021ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
E021ListRowContainer.displayName = "E021ListRowContainer";


