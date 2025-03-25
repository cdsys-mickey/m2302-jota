import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { F01Context } from "@/modules/F01/F01Context";
import F01ListRow from "./F01ListRow";
import { useCallback } from "react";

export const F01ListRowContainer = (props) => {
	const f01 = useContext(F01Context);
	const { isItemLoading } = f01;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => f01.listData[index], [f01.listData, index]);

	return (
		<F01ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => f01.handleSelect(e, value)}
			// confirmResetPword={(e) => confirmResetPword(e, value)}
			// promptCopyAuth={(e) => promptCopyAuth(e, value)}
			{...rest}
		/>
	);
};
F01ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
F01ListRowContainer.displayName = "F01ListRowContainer";

