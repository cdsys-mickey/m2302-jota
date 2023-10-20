import { Button } from "@mui/material";
import React, { useRef } from "react";

const DEFAULT_FILE_TYPES = ".jpg, .jpeg, .png";

const UploadButton = ({
	multiple = false,
	accept = DEFAULT_FILE_TYPES,
	children,
	onClick,
	onSelect,
	...rest
}) => {
	const inputRef = useRef(null);

	const handleClick = (e) => {
		if (onClick) {
			onClick(e);
		}
		inputRef.current.click();
	};

	const handleFileChange = (e) => {
		// const fileObj = e.target.files && e.target.files[0];
		// const fileList = Array.from(e.target.files);
		const fileList = e.target.files;
		if (!fileList) {
			if (onSelect) onSelect(null);
			return;
		}

		// 👇️ reset file input, -> emptys e.target.files

		console.debug("fileList", fileList);
		// 👇️ can still access file object here
		if (onSelect) onSelect(e, fileList);
		e.target.value = null;
	};

	return (
		<div>
			<input
				style={{ display: "none" }}
				ref={inputRef}
				type="file"
				onChange={handleFileChange}
				accept={accept}
				multiple={multiple}
			/>

			<Button onClick={handleClick} {...rest}>
				{children || "上傳"}
			</Button>
		</div>
	);
};

export default React.memo(UploadButton);
