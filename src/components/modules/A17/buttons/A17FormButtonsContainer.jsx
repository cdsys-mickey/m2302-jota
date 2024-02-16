import { useContext } from "react";
import { A17Context } from "../../../../contexts/A17/A17Context";
import A17FormEditButtons from "./A17FormEditButtons";
import A17FormViewButtons from "./A17FormViewButtons";

export const A17FormButtonsContainer = () => {
	const a17 = useContext(A17Context);

	if (a17.editing) {
		return (
			<A17FormEditButtons
				onSave={a17.handleSubmit}
				onCancel={a17.cancelEditing}
				editWorking={a17.editWorking}
			/>
		);
	}

	return <A17FormViewButtons onEdit={a17.promptUpdating} />;
};

A17FormButtonsContainer.displayName = "A17FormButtonsContainer";
