import { D07Context } from "@/contexts/D07/D07Context";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import D07ListRow from "./D07ListRow";

export const D07ListRowContainer = (props) => {
	const c04 = useContext(D07Context);
	const { isItemLoading } = c04;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => c04.listData[index], [c04.listData, index]);

	return (
		<D07ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => c04.handleSelect(e, value)}
			expChecking={c04.expChecking}
			{...rest}
		/>
	);
};
D07ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
D07ListRowContainer.displayName = "D07ListRowContainer";




