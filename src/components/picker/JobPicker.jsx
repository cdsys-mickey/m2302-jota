import { AuthContext } from "@/contexts/auth/AuthContext";
import Jobs from "@/modules/md-jobs";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useCallback, useContext, useMemo } from "react";

const JobPicker = memo((props) => {
	const {
		label = "作業",
		forId = false,
		...rest
	} = props;
	const auth = useContext(AuthContext);

	const getOptions = useCallback((payload) => {
		return payload["data"];
	}, []);

	const querystring = useMemo(() => {
		return queryString.stringify({

		});
	}, []);

	const getOptionLabel = useCallback(
		(option) => {
			return forId
				? Jobs.getOptionLabelForId(option)
				: Jobs.getOptionLabel(option);
		},
		[forId]
	);

	return (
		<OptionPicker
			label={label}
			url="v1/app/modules"
			bearer={auth.token}
			getOptionLabel={getOptionLabel}
			renderOptionLabel={Jobs.getOptionLabel}
			isOptionEqualToValue={Jobs.isOptionEqualToValue}
			getOptions={getOptions}
			querystring={querystring}
			notFoundText="作業代號 ${input} 不存在"
			// blurToLookup
			{...rest}
		/>
	);
});

JobPicker.propTypes = {
	label: PropTypes.string,
	uid: PropTypes.string,
	scope: PropTypes.number,
	excludesSelf: PropTypes.bool,
	forId: PropTypes.bool,
};

JobPicker.displayName = "JobPicker";
export default JobPicker;
