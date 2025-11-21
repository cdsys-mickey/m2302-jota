import CheckboxExGroup from "./CheckboxExGroup";
import _ from "lodash";
import PropTypes from "prop-types";
import { useOptions } from "../../shared-hooks/useOptions";

const defaultGetOptions = (payload) => {
	return payload["data"];
};

export const CheckboxExGroupContainer = (props) => {
	const {
		// WebApi
		method = "get",
		url,
		bearer,
		querystring = "",
		...rest
	} = props;

	const options = useOptions({ url, method, bearer, querystring });
	const { optionsData, optionsError, optionsLoading } = options;
	return (
		<CheckboxExGroup
			options={optionsData}
			error={optionsError}
			loading={optionsLoading}
			{...rest}
		/>
	);
};

CheckboxExGroupContainer.displayName = "CheckboxExGroupContainer";
CheckboxExGroupContainer.propTypes = {
	method: PropTypes.string,
	url: PropTypes.string,
	bearer: PropTypes.string,
	querystring: PropTypes.string,
	defaultOptions: PropTypes.array,
	getOptions: PropTypes.func,
	disabled: PropTypes.bool,
};
