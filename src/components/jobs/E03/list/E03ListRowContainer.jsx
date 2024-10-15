import { E03Context } from "@/contexts/E03/E03Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import E03ListRow from "./E03ListRow";

export const E03ListRowContainer = (props) => {
	const e03 = useContext(E03Context);
	const { isItemLoading } = e03;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => e03.listData[index], [e03.listData, index]);

	return (
		<E03ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => e03.handleSelect(e, value)}
			{...rest}
		/>
	);
};
E03ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
E03ListRowContainer.displayName = "E03ListRowContainer";




