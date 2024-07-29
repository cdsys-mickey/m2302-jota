import { useRef } from "react";
import DSGTest2 from "./DSGTest2";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { FormProvider, useForm } from "react-hook-form";

export const DSGTest2Container = () => {
	const gridRef = useRef();
	const auth = useContext(AuthContext);
	const form = useForm();
	return (
		<FormProvider {...form}>
			<form>
				<DSGTest2 gridRef={gridRef} bearer={auth.token} />
			</form>
		</FormProvider>
	);
};

DSGTest2Container.displayName = "DSGTest2Container";
