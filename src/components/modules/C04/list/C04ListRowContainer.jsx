import { C04Context } from "@/contexts/C04/C04Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import C04ListRow from "./C04ListRow";

export const C04ListRowContainer = (props) => {
	const c04 = useContext(C04Context);
	const { isItemLoading } = c04;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => c04.listData[index], [c04.listData, index]);

	return (
		<C04ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => c04.handleSelect(e, value)}
			{...rest}
		/>
	);
};
C04ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
C04ListRowContainer.displayName = "C04ListRowContainer";