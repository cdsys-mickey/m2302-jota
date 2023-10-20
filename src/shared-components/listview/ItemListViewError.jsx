import { Container } from "@mui/material";
import ErrorBox from "@/shared-components/ErrorBox";
import FlexBox from "@/shared-components/FlexBox";

const ItemListViewError = ({
	title = "讀取錯誤",
	message,
	error,
	children,
	...rest
}) => {
	return (
		<Container maxWidth="xs">
			<FlexBox pt="20%" justifyContent="center">
				<ErrorBox
					transparent
					title={title}
					error={error}
					message={message}>
					{children}
				</ErrorBox>
			</FlexBox>
		</Container>
	);
};

export default ItemListViewError;
