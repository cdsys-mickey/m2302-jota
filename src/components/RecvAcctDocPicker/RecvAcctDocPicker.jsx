import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useCallback, useContext, useMemo } from "react";
import RecvAcctDoc from "./RecvAcctDoc.mjs";


const RecvAcctDocPicker = memo((props) => {
	const {
		label = "清單編號",
		forId = false,
		...rest
	} = props;
	const auth = useContext(AuthContext);

	// const getData = useCallback((payload) => {
	// 	return payload;
	// }, []);

	const querystring = useMemo(() => {
		return queryString.stringify({
			opts: 1,
		});
	}, []);

	const getOptionLabel = useCallback(
		(option) => {
			return forId
				? RecvAcctDoc.getOptionLabelForId(option)
				: RecvAcctDoc.getOptionLabel(option);
		},
		[forId]
	);

	return (
		<OptionPickerWrapper
			label={label}
			url="v1/sales/recv-account/docs"
			bearer={auth.token}
			getOptionLabel={getOptionLabel}
			renderOptionLabel={RecvAcctDoc.getOptionLabel}
			isOptionEqualToValue={RecvAcctDoc.isOptionEqualToValue}
			// getData={getData}
			querystring={querystring}
			notFoundText="銷售/銷退單號 ${input} 不存在"
			noOptionsText="請直接輸入銷貨/銷退單號"
			blurToLookup
			{...rest}
		/>
	);
});

RecvAcctDocPicker.propTypes = {
	label: PropTypes.string,
	uid: PropTypes.string,
	scope: PropTypes.number,
	excludesSelf: PropTypes.bool,
	forId: PropTypes.bool,
};

RecvAcctDocPicker.displayName = "RecvAcctDocPicker";
export default RecvAcctDocPicker;
