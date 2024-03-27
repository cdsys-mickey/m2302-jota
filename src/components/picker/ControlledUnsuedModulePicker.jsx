import { AuthContext } from "@/contexts/auth/AuthContext";
import { ControlledWebApiOptionPicker } from "@/shared-components/controlled/ControlledWebApiOptionPicker";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useContext } from "react";
import { ZA03Context } from "../../contexts/ZA03/ZA03Context";
import { useMemo } from "react";
import ZA03 from "../../modules/md-za03";

export const ControlledUnusedModulePicker = memo((props) => {
	const { name, label = "可用作業", ...rest } = props;
	const { token } = useContext(AuthContext);
	const za03 = useContext(ZA03Context);

	const uid = useMemo(() => {
		return za03.itemData?.UID;
	}, [za03.itemData?.UID]);

	return (
		<ControlledWebApiOptionPicker
			multiple
			name={name}
			label={label}
			bearer={token}
			disabled={!uid}
			// url={`v1/ou/user/unused-modules`}
			url={`v1/ou/user/unused-authorities`}
			querystring={queryString.stringify({
				uid,
			})}
			filterSelectedOptions
			getData={(x) => x}
			getOptionKey={ZA03.getOptionKey}
			getOptionLabel={ZA03.getOptionLabel}
			isOptionEqualToValue={ZA03.isOptionEqualToValue}
			renderTagLabel={ZA03.renderTagLabel}
			{...rest}
		/>
	);
});

ControlledUnusedModulePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
	uid: PropTypes.string,
};

ControlledUnusedModulePicker.displayName = "ControlledUnusedModulePicker";
