import { D06Context } from "@/contexts/D06/D06Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import D06ListRow from "./D06ListRow";

export const D06ListRowContainer = (props) => {
	const c04 = useContext(D06Context);
	const { isItemLoading } = c04;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => c04.listData[index], [c04.listData, index]);

	return (
		<D06ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => c04.handleSelect(e, value)}
			expChecking={c04.expChecking}
			{...rest}
		/>
	);
};
D06ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
D06ListRowContainer.displayName = "D06ListRowContainer";



