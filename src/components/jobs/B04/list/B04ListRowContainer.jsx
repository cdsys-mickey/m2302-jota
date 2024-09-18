import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { B04Context } from "@/contexts/B04/B04Context";
import B04ListRow from "./B04ListRow";
import { useCallback } from "react";

export const B04ListRowContainer = (props) => {
	const b04 = useContext(B04Context);
	const { isItemLoading } = b04;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => b04.listData[index], [b04.listData, index]);

	return (
		<B04ListRow
			index={index}
			loading={loading}
			value={value}
			// onClick={(e) => b04.handleSelect(e, value)}
			// confirmResetPword={(e) => confirmResetPword(e, value)}
			// promptCopyAuth={(e) => promptCopyAuth(e, value)}
			{...rest}
		/>
	);
};
B04ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
B04ListRowContainer.displayName = "B04ListRowContainer";



