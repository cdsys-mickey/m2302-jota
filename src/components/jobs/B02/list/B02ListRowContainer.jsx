import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { B02Context } from "@/contexts/B02/B02Context";
import B02ListRow from "./B02ListRow";
import { useCallback } from "react";
import { BContext } from "@/contexts/B/BContext";
import { B04Context } from "@/contexts/B04/B04Context";

export const B02ListRowContainer = (props) => {
	const b = useContext(BContext);
	const b02 = useContext(b.forNew ? B04Context : B02Context);
	const { isItemLoading } = b02;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => b02.listData[index], [b02.listData, index]);

	return (
		<B02ListRow
			index={index}
			loading={loading}
			value={value}
			// onClick={(e) => b02.handleSelect(e, value)}
			// confirmResetPword={(e) => confirmResetPword(e, value)}
			// promptCopyAuth={(e) => promptCopyAuth(e, value)}
			{...rest}
		/>
	);
};
B02ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
B02ListRowContainer.displayName = "B02ListRowContainer";


