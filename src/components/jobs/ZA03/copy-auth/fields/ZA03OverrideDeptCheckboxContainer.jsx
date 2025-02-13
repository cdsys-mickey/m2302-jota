import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";

export const ZA03OverrideDeptCheckboxContainer = (props) => {
	const { ...rest } = props;
	const depts = useWatch({
		name: "depts",
	});
	const fromUser = useWatch({
		name: "fromUser",
	});

	const disabled = useMemo(() => {
		return depts?.length !== 1 || !fromUser;
	}, [depts.length, fromUser]);

	if (!fromUser) {
		return false;
	}

	return <CheckboxExWrapper disabled={disabled} {...rest} />;
};

ZA03OverrideDeptCheckboxContainer.displayName =
	"ZA03OverrideDeptCehckboxContainer";
