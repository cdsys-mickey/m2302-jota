import { C03Context } from "@/contexts/C03/C03Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import C03ListRow from "./C03ListRow";

export const C03ListRowContainer = (props) => {
	const c03 = useContext(C03Context);
	const { isItemLoading } = c03;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => c03.listData[index], [c03.listData, index]);

	return (
		<C03ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => c03.handleSelect(e, value)}
			{...rest}
		/>
	);
};
C03ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
C03ListRowContainer.displayName = "C03ListRowContainer";
