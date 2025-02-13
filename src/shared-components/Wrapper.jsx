const Wrapper = ({ condition, wrapper, children }) => {
	return condition ? wrapper(children) : children;
}

export default Wrapper;