import { FrameBanner, FrameBox } from "@/shared-components";
import P38FormContainer from "./form/P38FormContainer";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useContext } from "react";
import P38Context from "./P38Context";
import CrudContext from "@/contexts/crud/CrudContext";
import { useInit } from "@/shared-hooks/useInit";


export const P38FrameContainer = () => {
	const crud = useContext(CrudContext);

	useInit(() => {
		return () => {
			crud.cancelAction();
			console.log("p38 unloaded");
		}
	}, [crud]);

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner>

			</FrameBanner>
			{/* 工具列 */}
			{/* <P38Toolbar /> */}
			<P38FormContainer />
		</FrameBox>
	);
};

P38FrameContainer.displayName = "P38FrameContainer";




