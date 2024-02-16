import { useContext } from "react";
import A17Form from "./A17Form";
import { A17Context } from "../../../contexts/A17/A17Context";
import { useInit } from "../../../shared-hooks/useInit";
import { useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

export const A17FormContainer = () => {
	const a17 = useContext(A17Context);
	const { loadItem, itemDataReady, itemData } = a17;

	const { reset } = useFormContext();

	useInit(() => {
		loadItem();
	}, []);

	useEffect(() => {
		if (itemDataReady) {
			reset(itemData);
		}
	}, [itemData, itemDataReady, reset]);

	return (
		<A17Form
			readWorking={a17.readWorking}
			itemDataReady={a17.itemDataReady}
			editing={a17.editing}
			updating={a17.updating}
			readFailed={a17.readFailed}
			readError={a17.readError}
		/>
	);
};

A17FormContainer.displayName = "A17FormContainer";
