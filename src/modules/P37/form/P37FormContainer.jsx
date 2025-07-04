import { FormProvider, useForm, useWatch } from "react-hook-form";
import P37FormView from "./P37FormView";
import TourGroupTypes from "@/components/TourGroupTypePicker/TourGroupTypes.mjs";
import { useEffect } from "react";
import { useContext } from "react";
import P37Context from "../P37Context";
import { useInit } from "@/shared-hooks/useInit";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useHotkeys } from "react-hotkeys-hook";

const P37FormContainer = (props) => {
	const { ...rest } = props;
	const p37 = useContext(P37Context);
	const form = useForm({
		defaultValues: {
			GrpType: TourGroupTypes.getDefaultValue(),
		}
	});

	const handleSubmit = form.handleSubmit(p37.onEditorSubmit, p37.onEditorSubmitError);
	useHotkeys(["Control+Enter"], () => {
		if (!p37.grid.readOnly) {
			setTimeout(handleSubmit)
		}
	}, {
		enableOnFormTags: true
	})

	const tourGroupType = useWatch({
		name: "GrpType",
		control: form.control
	})

	useChangeTracking(() => {
		p37.loadItem({ id: tourGroupType })
	}, [tourGroupType]);

	useInit(() => {
		p37.loadItem({ id: TourGroupTypes.getDefaultValue() });
	}, []);

	return (
		<FormProvider {...form}>
			<P37FormView
				loadWorking={p37.loadWorking}
				loadError={p37.loadError}
				{...rest}
			/>
		</FormProvider>
	);
}

P37FormContainer.displayName = "P37FormContainer";
export default P37FormContainer;