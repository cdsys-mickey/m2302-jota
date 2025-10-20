import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { ZA03CopyAuthContext } from "@/contexts/ZA03/ZA03CopyAuthContext";
import CheckboxExGroup from "@/shared-components/checkbox-group/CheckboxExGroup";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import DeptOptions from "@/modules/DeptOptions.mjs";

export const ZA03CopyAuthDeptCheckboxGroupContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const { setValue } = form;
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

	const za03 = useContext(ZA03Context);

	const { height } = useWindowSize();
	const overrideDept = useWatch({
		name: "overrideDept",
	});

	const getOptionKey = useCallback((opts) => {
		return DeptOptions.getOptionKey(opts);
	}, []);

	const getOptionLabel = useCallback(
		(v) => {
			if (overrideDept) {
				return `${DeptOptions.getOptionLabel(v)}→${za03.selectedDept?.AbbrName || ""
					}`;
			}
			const result = `${DeptOptions.getOptionLabel(v)}→${v?.AbbrName}`;
			return result;
		},
		[overrideDept, za03.selectedDept?.AbbrName]
	);

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
		if (fromUser?.UID) {
			loadOptions();
			setValue("depts", []);
		}
	}, [fromUser?.UID, loadOptions, setValue]);

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
			height={height - 480}
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
