import { AuthContext } from "@/contexts/auth/AuthContext";

import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useContext, useMemo } from "react";
import CmsEntryGridHeader from "./CmsEntryGridHeader";
import CmsEntryGridRow from "./CmsEntryGridRow";
import CmsEntries from "./CmsEntries";

export const CmsEntryPicker = (props) => {
	const { label = "佣金單號", cleared, forId = false, ...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		const params = {
			tp: 100,
			...(cleared != null && {
				c: cleared ? 1 : 0
			})
		};
		return queryString.stringify(params);
	}, [cleared]);

	return (
		<OptionPicker
			label={label}
			bearer={token}
			url={`v1/cms/entries`}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={CmsEntries.getOptionLabel}
			isOptionEqualToValue={CmsEntries.isOptionEqualToValue}
			renderTagLabel={CmsEntries.renderTagLabel}
			optionLabelSize="md"
			{...!forId && {
				GridHeaderComponent: CmsEntryGridHeader,
				GridRowComponent: CmsEntryGridRow
			}}
			notFoundText="佣金單號 ${input} 不存在"
			inputParam="fz"
			clearOnChange
			virtualize
			disableOpenOnInput
			// disableClose
			{...rest}
		/>
	);
};

CmsEntryPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	cleared: PropTypes.bool,
	forId: PropTypes.bool
};

CmsEntryPicker.displayName = "DepOrderPicker";
