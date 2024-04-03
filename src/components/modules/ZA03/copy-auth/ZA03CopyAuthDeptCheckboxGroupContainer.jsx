import { useContext } from "react";
import CheckboxExGroup from "../../../../shared-components/checkbox-group/CheckboxExGroup";
import { UserDeptCheckboxGroupContainer } from "../../../UserDeptCheckboxGroupContainer";
import { ZA03Context } from "../../../../contexts/ZA03/ZA03Context";
import { ZA03CopyAuthContext } from "../../../../contexts/ZA03/ZA03CopyAuthContext";
import { useEffect } from "react";
import { CheckboxExGroupContainer } from "../../../../shared-components/checkbox-group/CheckboxExGroupContainer";
import { useMemo } from "react";
import queryString from "query-string";
import PropTypes from "prop-types";
import Auth from "../../../../modules/md-auth";
import { AuthContext } from "../../../../contexts/auth/AuthContext";
import { useCallback } from "react";
import Depts from "../../../../modules/md-depts";
import { useWindowSize } from "../../../../shared-hooks/useWindowSize";

export const ZA03CopyAuthDeptCheckboxGroupContainer = (props) => {
	const { ...rest } = props;

	const copyAuth = useContext(ZA03CopyAuthContext);
	const {
		fromUser,
		clearOptions,
		loadOptions,
		optionsData,
		optionsLoading,
		optionsNotLoaded,
		optionsLoaded,
	} = copyAuth;

	const { height } = useWindowSize();

	const getOptionKey = useCallback((opts) => {
		return Depts.getOptionKey(opts);
	}, []);

	const getOptionLabel = useCallback((opts) => {
		return Depts.getOptionLabel(opts);
	}, []);

	const isOptionChecked = useCallback(
		(option, value) => {
			return value.includes(getOptionKey(option));
		},
		[getOptionKey]
	);

	const disabled = useMemo(() => {
		return !fromUser?.UID;
	}, [fromUser?.UID]);

	useEffect(() => {
		if (fromUser?.UID && optionsNotLoaded) {
			loadOptions();
		}
	}, [fromUser?.UID, loadOptions, optionsNotLoaded]);

	useEffect(() => {
		if (!fromUser && optionsLoaded) {
			clearOptions();
		}
	}, [clearOptions, fromUser, optionsData, optionsLoaded]);

	return (
		<CheckboxExGroup
			disabled={disabled}
			options={optionsData}
			loading={optionsLoading}
			getOptionKey={getOptionKey}
			getOptionLabel={getOptionLabel}
			isOptionChecked={isOptionChecked}
			height={height - 400}
			rules={{
				required: "至少選取一個來源單位",
			}}
			{...rest}
		/>
	);
};

ZA03CopyAuthDeptCheckboxGroupContainer.displayName =
	"ZA03CopyAuthDeptCheckboxGroupContainer";
ZA03CopyAuthDeptCheckboxGroupContainer.propTypes = {
	scope: PropTypes.number,
};
