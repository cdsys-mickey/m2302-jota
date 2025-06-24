import { useFormContext } from "react-hook-form";
import G04DeleteTabView from "./G04DeleteTabView";
import { useCallback } from "react";
import Forms from "@/shared-modules/Forms.mjs";

const G04DeleteTabContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const handleDelSessionChange = useCallback((newSession) => {
		console.log("newSession", newSession);
		if (newSession?.AccYM) {
			form.setValue("delYM", Forms.parseDate(newSession?.AccYM + "/01"))
		}
	}, [form]);

	const handleDelSessionInputChange = useCallback((e, newValue) => {
		form.setValue("Stage", newValue);
	}, [form]);

	return <G04DeleteTabView
		handleDelSessionChange={handleDelSessionChange}
		handleDelSessionInputChange={handleDelSessionInputChange}
		{...rest} />
}

G04DeleteTabContainer.displayName = "G04DeleteTabContainer";
export default G04DeleteTabContainer;