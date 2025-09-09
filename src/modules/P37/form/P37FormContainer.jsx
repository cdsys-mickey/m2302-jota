import CmsGroupTypes from "@/components/CmsGroupTypePicker/CmsGroupTypes.mjs";
import TourGroupTypes from "@/components/TourGroupTypePicker/TourGroupTypes.mjs";
import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useInit } from "@/shared-hooks/useInit";
import { useCallback, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import P37Context from "../P37Context";
import P37FormView from "./P37FormView";

const P37FormContainer = (props) => {
	const { ...rest } = props;
	const p37 = useContext(P37Context);
	const form = useForm({
		defaultValues: {
			GrpType: TourGroupTypes.getDefaultValue(),
			SUpCP: ['', '', '', ''],
			SDnCp: ['', '', '', ''],
			SDrvCms: ['', '', '', ''],
			STrvCms: ['', '', '', '']
		}
	});
	const { reset } = form;

	useInit(() => {
		p37.loadItem({ id: CmsGroupTypes.Types.DOMESTIC });
	}, []);

	// useChangeTracking(() => {
	// 	if (p37.itemDataReady) {
	// 		reset(p37.itemData);
	// 		console.log("reset", p37.itemData);
	// 	}
	// }, [p37.itemData, p37.itemDataReady]);

	const formMeta = useFormMeta(
		`
		SDnCP[0],
		SUpCP[0],
		SDrvCms[0],
		STrvCms[0],
		SDnCp[1],
		SUpCP[1],
		SDrvCms[1],
		STrvCms[1],
		SDnCp[2],
		SUpCp[2],
		SDrvCms[2],
		STrvCms[2],
		ADrvCms,
		BDrvCms,
		ATrvCms
		`
	);

	const handleSubmit = form.handleSubmit(p37.onEditorSubmit, p37.onEditorSubmitError);
	useHotkeys(["Control+Enter"], () => {
		if (p37.editing) {
			setTimeout(handleSubmit)
		}
	}, {
		enableOnFormTags: true
	})

	useChangeTracking(() => {
		if (p37.itemDataReady) {
			reset(p37.itemData);
		}
	}, [p37.itemData, p37.itemDataReady]);


	const isFieldDisabled = useCallback(
		(field) => {
			switch (p37.selectedTab) {
				case CmsGroupTypes.Types.DOMESTIC:
					return !["SUpCP[0]", "SDrvCms[0]", "SDnCp[1]", "SUpCP[1]", "SDrvCms[1]", "SDnCp[2]", "SDrvCms[2]"]
						.includes(field.name);
				case CmsGroupTypes.Types.AGENCY:
					return !["SUpCP[0]", "SDrvCms[0]", "STrvCms[0]",
						"SDnCp[1]", "SUpCP[1]", "SDrvCms[1]", "STrvCms[1]",
						"SDnCp[2]", "SDrvCms[2]", "STrvCms[2]"]
						.includes(field.name);
				case CmsGroupTypes.Types.BUS:
					return !["SUpCP[0]", "SDrvCms[0]", "STrvCms[0]",
						"SDnCp[1]", "SUpCP[1]", "SDrvCms[1]", "STrvCms[1]",
						"SDnCp[2]", "SDrvCms[2]", "STrvCms[2]"
					]
						.includes(field.name);
				// case CmsGroupTypes.Types.CHINA:
				default:
					return false;
			}
		},
		[p37.selectedTab]
	);


	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} isFieldDisabled={isFieldDisabled}>
				<P37FormView
					selectedTab={p37.selectedTab}
					handleTabChange={p37.handleTabChange}
					editing={p37.editing}
					groupTypes={p37.groupAliasMap}
					{...rest}
				/>
			</FormMetaProvider>
		</FormProvider>
	);
}

P37FormContainer.displayName = "P37FormContainer";
export default P37FormContainer;