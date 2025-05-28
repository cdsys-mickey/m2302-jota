import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useCallback, useContext, useMemo } from "react";
import G10Doc from "./G10Doc.mjs";

const G10DocPicker = memo((props) => {
	const {
		label = "清單編號",
		forId = false,
		...rest
	} = props;
	const auth = useContext(AuthContext);

	const getOptions = useCallback((payload) => {
		return payload.data;
	}, []);

	const querystring = useMemo(() => {
		return queryString.stringify({
			opts: 1,
		});
	}, []);

	const getOptionLabel = useCallback(
		(option) => {
			return forId
				? G10Doc.getOptionLabelForId(option)
				: G10Doc.getOptionLabel(option);
		},
		[forId]
	);

	const notFoundText = useCallback(({ input, error }) => {
		return error?.message ?? `單號 ${input} 不存在`;
	}, []);

	return (
		<OptionPickerWrapper
			label={label}
			url="v1/sales/recv-account/docs"
			bearer={auth.token}
			getOptionLabel={getOptionLabel}
			renderOptionLabel={G10Doc.getOptionLabel}
			isOptionEqualToValue={G10Doc.isOptionEqualToValue}
			getOptions={getOptions}
			querystring={querystring}
			// notFoundText="單號 ${input} 不存在"
			notFoundText={notFoundText}
			errorText=""
			noOptionsText="請直接輸入銷貨或銷退單號"
			blurToLookup
			{...rest}
		/>
	);
});

G10DocPicker.propTypes = {
	label: PropTypes.string,
	uid: PropTypes.string,
	scope: PropTypes.number,
	excludesSelf: PropTypes.bool,
	forId: PropTypes.bool,
};

G10DocPicker.displayName = "G10DocPicker";
export default G10DocPicker;
