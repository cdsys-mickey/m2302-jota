import { InputTestContainer } from "./InputTestContainer";
import { InputTestProvider } from "./InputTestProvider";

const InputTestPage = (props) => {
	const { ...rest } = props;
	return (
		<InputTestProvider>
			<InputTestContainer />
		</InputTestProvider>
	);
};

InputTestPage.propTypes = {};

InputTestPage.displayName = "InputTestPage";
export default InputTestPage;
