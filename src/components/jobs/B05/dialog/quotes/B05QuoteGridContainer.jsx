import { useContext } from "react";
import B05QuoteGrid from "./B05QuoteGrid";
import { B05Context } from "@/contexts/B05/B05Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";

export const B05QuoteGridContainer = (props) => {
	const { ...rest } = props;
	const b05 = useContext(B05Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();

	return (
		<DSGContext.Provider value={{
			...b05.grid,
			...b05.gridMeta,
			readOnly: !b05.editing
		}}>
			<B05QuoteGrid
				gridRef={b05.setGridRef}
				readOnly={!b05.editing}
				data={b05.gridData}
				onChange={b05.handleGridChange}
				onActiveCellChange={b05.handleActiveCellChange}
				bearer={auth.token}
				height={height - 330}
				getRowKey={b05.getRowKey}
				createRow={b05.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

B05QuoteGridContainer.displayName = "B05QuoteGridContainer";
