import { useEffect } from "react";
import CheckboxExGroup from "./CheckboxExGroup";
import { useState } from "react";
import { useWebApi } from "../../shared-hooks/useWebApi";
import LoadingTypography from "../LoadingTypography";
import { useCallback } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { useOptions } from "../../shared-hooks/useOptions";

const defaultGetData = (payload) => {
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
	getData: PropTypes.func,
	disabled: PropTypes.bool,
};
