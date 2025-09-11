import CheckboxExWrapper from "../../shared-components/checkbox/CheckboxExWrapper";
import PropTypes from "prop-types";

export const RememberMeCheckboxContainer = (props) => {
	const { label = "記住我", ...rest } = props;

	// const handleClick = useCallback((e) => {
	// 	// console.log("handleClick", checked);
	// 	if (!e.target.checked) {
	// 		console.log("removing cookie");
	// 		// signin.forgetMe();
	// 	}
	// }, []);

	return <CheckboxExWrapper label={label} {...rest} />;
};

RememberMeCheckboxContainer.propTypes = {
	label: PropTypes.string
}