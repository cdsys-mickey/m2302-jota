import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import ZA03 from "@/modules/ZA03.mjs";
import ZA03DialogEditButtons from "../../dialog/buttons/ZA03DialogEditButtons";
import ZA03DialogViewButtons from "../../dialog/buttons/ZA03DialogViewButtons";
import ListToolbar from "../../../../../shared-components/listview/toolbar/ListToolbar";

export const ZA03InfoToolbarContainer = () => {
	const za03 = useContext(ZA03Context);
	const form = useFormContext();

	if (za03.selectedTab !== ZA03.Tabs.INFO) {
		return false;
	}

	if (za03.editing) {
		return (
			<ZA03DialogEditButtons
				onSave={form.handleSubmit(
					za03.onEditorSubmit,
					za03.onEditorSubmitError
				)}
				onCancel={
					za03.creating
						? za03.confirmQuitCreating
						: za03.confirmReturnReading
				}
				loading={za03.editWorking}
			/>
		);
	}

	return (
		<ListToolbar
			rightComponents={
				<ZA03DialogViewButtons
					onEdit={za03.promptUpdating}
					onDelete={za03.confirmDelete}
				/>
			}
		/>
	);
};

ZA03InfoToolbarContainer.propTypes = {};

ZA03InfoToolbarContainer.displayName = "ZA03InfoToolbarContainer";
