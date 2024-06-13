import { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { A17Context } from "@/contexts/A17/A17Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useInit } from "@/shared-hooks/useInit";
import A17Form from "./A17Form";

export const A17FormContainer = () => {
	const a17 = useContext(A17Context);
	const { loadItem, itemDataReady, itemData } = a17;
	const { operator } = useContext(AuthContext);

	const { reset } = useFormContext();

	useInit(() => {
		if (operator?.CurDeptID) {
			loadItem(operator.CurDeptID);
		}
	}, [operator?.CurDeptID]);

	useEffect(() => {
		if (itemDataReady) {
			reset(itemData);
		}
	}, [itemData, itemDataReady, reset]);

	return (
		<A17Form
			readWorking={a17.readWorking}
			readError={a17.readError}
			readMessage={a17.readMessage}
			itemDataReady={a17.itemDataReady}
			editing={a17.editing}
			updating={a17.updating}
			readFailed={a17.readFailed}
			handleDeptChanged={a17.handleDeptChanged}
		/>
	);
};

A17FormContainer.displayName = "A17FormContainer";
