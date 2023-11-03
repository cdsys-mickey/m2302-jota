const getRootPath = () => {
	return `/${import.meta.env.VITE_PUBLIC_URL}`;
};

const App = {
	getRootPath,
};

export default App;
