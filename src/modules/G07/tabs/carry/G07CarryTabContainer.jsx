import { useFormContext } from "react-hook-form";
import G07CarryTabView from "./G07CarryTabView";
import { useCallback } from "react";

const G07CarryTabContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();

	const onSessionChanged = useCallback(() => {
		form.setValue("CustID", null);
	}, [form]);

	return <G07CarryTabView onSessionChanged={onSessionChanged} {...rest} />
}

G07CarryTabContainer.displayName = "G07CarryTabContainer";
export default G07CarryTabContainer;