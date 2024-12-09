import ReportSubmitButton from "./ReportSubmitButton";

const ReportSubmitButtonContainer = (props) => {
	const { ...rest } = props;

	return <ReportSubmitButton  {...rest} />
}

ReportSubmitButtonContainer.displayName = "ReportSubmitButtonContainer";
export default ReportSubmitButtonContainer;