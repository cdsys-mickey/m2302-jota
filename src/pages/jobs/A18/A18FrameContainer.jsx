import { A18FormContainer } from "@/components/jobs/A18/A18FormContainer";
import A18OrderBy from "@/components/jobs/A18/A18OrderBy.mjs";
import { AuthContext } from "@/contexts/auth/AuthContext";
import StdPrint from "@/modules/StdPrint.mjs";
import { FrameBanner, FrameBox } from "@/shared-components";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const A18FrameContainer = () => {
	const { operator } = useContext(AuthContext);
	const form = useForm({
		defaultValues: {
			dept: {
				DeptID: operator.CurDeptID,
				AbbrName: operator.CurDeptName,
			},
			orderBy: A18OrderBy.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});
	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <A18Toolbar /> */}
			{/* <EmptyToolbar /> */}
			{/* 表單 */}
			<FormProvider {...form}>
				<A18FormContainer />
			</FormProvider>
		</FrameBox>
	);
};

A18FrameContainer.displayName = "A18Frame";
