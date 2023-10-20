import React from "react";
import { LinearProgress, Box, Grid } from "@mui/material";

const ProgressColumn = ({ children, ...rest }) => {
	return (
		<Grid item xs={12} sm={1} sx={{ textAlign: "right" }} {...rest}>
			{children}
		</Grid>
	);
};

const ProgressBarColumn = ({ children, ...rest }) => {
	return (
		<Grid item xs={12}>
			{children}
		</Grid>
	);
};

const UploadingProgressRow = ({ children, ...rest }) => {
	return (
		<Grid container {...rest}>
			{children}
		</Grid>
	);
};

const FileNameColumn = ({ children, ...rest }) => {
	return (
		<Grid
			item
			xs={12}
			sm={11}
			sx={{
				height: "1.6rem",
				textOverflow: "ellipsis",
				overflowX: "hidden",
				whiteSpace: "nowrap",
			}}
			{...rest}>
			{children}
		</Grid>
	);
};

const FileProgress = ({ files, progress }) => {
	return (
		<Box sx={{ width: "100%", boxSizing: "border-box" }}>
			{files.map((file, index) => (
				<UploadingProgressRow key={`container_${index}`}>
					<FileNameColumn
						item
						xs={12}
						sm={11}
						sx={{
							height: "1.6rem",
							textOverflow: "ellipsis",
							overflowX: "hidden",
							whiteSpace: "nowrap",
						}}>
						{file.name}
					</FileNameColumn>
					<ProgressColumn>
						{index === 0 &&
						progress !== null &&
						progress !== undefined
							? `${progress}%`
							: ""}
					</ProgressColumn>
					<ProgressBarColumn>
						<LinearProgress
							variant={progress ? "determinate" : "indeterminate"}
							value={index === 0 ? progress : 0}
							key={`file-${index}`}
						/>
					</ProgressBarColumn>
				</UploadingProgressRow>
			))}
		</Box>
	);
};

export default React.memo(FileProgress);
