import { useFormContext } from "react-hook-form";
import G04RecoverTabView from "./G04RecoverTabView";
import { useCallback } from "react";
import Forms from "@/shared-modules/Forms.mjs";

const G04RecoverTabContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const handleSessionChange = useCallback((newSession) => {
		console.log("newSession", newSession);
		if (newSession?.AccYM) {
			form.setValue("recYM", Forms.parseDate(newSession?.AccYM + "/01"))
		}
	}, [form]);

	const handleSessionInputChange = useCallback((e, newValue) => {
		form.setValue("recStage", newValue);
	}, [form]);

	return (
		<G04RecoverTabView
			handleSessionChange={handleSessionChange}
			handleSessionInputChange={handleSessionInputChange}
			{...rest} />
	)
}

G04RecoverTabContainer.displayName = "G04RecoverTabContainer";
export default G04RecoverTabContainer;