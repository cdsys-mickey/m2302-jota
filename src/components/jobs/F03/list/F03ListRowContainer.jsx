import { F03Context } from "@/contexts/F03/F03Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import F03ListRow from "./F03ListRow";

export const F03ListRowContainer = (props) => {
	const c04 = useContext(F03Context);
	const { isItemLoading } = c04;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => c04.listData[index], [c04.listData, index]);

	return (
		<F03ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => c04.handleSelect(e, value)}
			expChecking={c04.expChecking}
			{...rest}
		/>
	);
};
F03ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
F03ListRowContainer.displayName = "F03ListRowContainer";





