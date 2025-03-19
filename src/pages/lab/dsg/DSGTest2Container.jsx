import { useRef } from "react";
import DSGTest2 from "./DSGTest2";
import { FormProvider, useForm } from "react-hook-form";

export const DSGTest2Container = () => {
	const gridRef = useRef();
	const form = useForm();
	return (
		<FormProvider {...form}>
			<form>
				<DSGTest2 gridRef={gridRef} />
			</form>
		</FormProvider>
	);
};

DSGTest2Container.displayName = "DSGTest2Container";
