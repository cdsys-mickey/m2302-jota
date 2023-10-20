import { Box } from "@mui/material";
import React, { forwardRef } from "react";

const FileDropzoneBox = forwardRef(
	(
		{ children, sx = [], isDragAccept, isDragReject, readOnly, ...rest },
		ref
	) => {
		return (
			<Box
				ref={ref}
				{...rest}
				sx={[
					{
						cursor: "pointer",
						border: "3px dashed #C8C8C8",
						...(!readOnly && {
							"&:hover": {
								border: "3px dashed #000",
								backgroundColor: "rgba(0 0 0 / 3%)",
							},
						}),
						"@keyframes progress": {
							"0%": {
								backgroundPosition: "0 0",
							},
							"100%": {
								backgroundPosition: "-70px 0",
							},
						},
					},
					isDragAccept && {
						border: "solid #4ce6c8",
						backgroundImage:
							"repeating-linear-gradient(-45deg, #97f3e2, #9cf1e6bd 25px, #e4fbf2 25px, #f1f1f1 50px)",
						animation: "progress 2s linear infinite !important",
						backgroundSize: "150% 100%",
					},
					isDragReject && {
						border: "solid #ffcc1d",
						backgroundImage:
							"repeating-linear-gradient(-45deg, #fff8d3, #fff9d5 25px, #ffe394bf 25px, #ffd19e 50px)",
						animation: "progress 2s linear infinite !important",
						backgroundSize: "150% 100%",
					},
				]}>
				{children}
			</Box>
		);
	}
);

export default React.memo(FileDropzoneBox);
