import { Navigate, Route, Routes } from "react-router-dom";

import { A01Provider } from "@/contexts/a01/A01Provider";
import { A02Provider } from "@/contexts/a02/A02Provider";
import { ZZCrudProvider } from "@/contexts/crud/ZZCrudProvider";
import { PurchaseProvider } from "@/contexts/purchase/PurchaseProvider";
import { A02FrameContainer } from "@/pages/a02/A02FrameContainer";
import HomeContainer from "@/pages/home/HomeContainer";
import SignIn from "@/pages/signin/SignIn";
import SignInX from "@/pages/signin/SignInX";
import ProtectedRoute from "@/routes/ProtectedRoute";
import SignInRoute from "@/routes/SignInRoute";
import { LoadingFrame } from "@/shared-components/protected-page/LoadingFrame";
import InfoPage from "@/shared-pages/InfoPage";
import { A03Provider } from "../contexts/a03/A03Provider";
import { A04Provider } from "../contexts/a04/A04Provider";
import { A16Provider } from "../contexts/a16/A16Provider";
import { A26Provider } from "../contexts/a26/A26Provider";
import { CrudProvider } from "../contexts/crud/CrudProvider";
import { MockC04FrameContainer } from "../mock-pages/MockC04FrameContainer";
import { A01FrameContainer } from "../pages/a01/A01FrameContainer";
import { A03FrameContainer } from "../pages/a03/A03FrameContainer";
import { A04FrameContainer } from "../pages/a04/A04FrameContainer";
import { A16FrameContainer } from "../pages/a16/A16FrameContainer";
import { A26FrameContainer } from "../pages/a26/A26FrameContainer";
import { DSGTestContainer } from "../pages/lab/DSGTestContainer";
import { DSGTestProvider } from "../pages/lab/DSGTestProvider";

const AppRoute = () => {
	return (
		<Routes>
			{/* Sign In */}
			<Route path="auth" element={<SignInRoute />}>
				<Route index path="signin" element={<SignIn />} />
				<Route path="signinx" element={<SignInX />} />
			</Route>
			{/* Lab */}
			<Route path="lab">
				<Route path="loading" element={<LoadingFrame />} />
				<Route
					path="dsg"
					element={
						<DSGTestProvider>
							<DSGTestContainer />
						</DSGTestProvider>
					}
				/>
			</Route>
			{/* LADING REDIRECTION */}
			<Route
				path="/"
				element={
					<Navigate to={import.meta.env.VITE_URL_LANDING} replace />
				}
			/>
			{/* PROTECTED */}
			<Route path="" element={<ProtectedRoute />}>
				<Route index path="home" element={<HomeContainer />} />

				<Route path="modules">
					{/* <Route
						path="A01M"
						element={
							<ZZCrudProvider>
								<MockProdsProvider>
									<MockA01FrameContainer />
								</MockProdsProvider>
							</ZZCrudProvider>
						}
					/> */}
					<Route
						path="A01"
						element={
							<CrudProvider>
								<A01Provider>
									<A01FrameContainer />
								</A01Provider>
							</CrudProvider>
						}
					/>
					<Route
						path="A02"
						element={
							// <DSGProvider
							// 	keyColumn="CodeID"
							// 	otherColumns="CodeData">
							<A02Provider>
								<A02FrameContainer />
							</A02Provider>
							// </DSGProvider>
						}
					/>
					<Route
						path="A03"
						element={
							<A03Provider>
								<A03FrameContainer />
							</A03Provider>
						}
					/>
					<Route
						path="A04"
						element={
							// <DSGProvider
							// 	keyColumn="CodeID"
							// 	otherColumns="CodeData">
							<A04Provider>
								<A04FrameContainer />
							</A04Provider>
							// </DSGProvider>
						}
					/>
					<Route
						path="A16"
						element={
							// <DSGProvider
							// 	keyColumn="DeptID"
							// 	otherColumns="GroupKey,DeptName,AbbrName">
							<A16Provider>
								<A16FrameContainer />
							</A16Provider>
							// </DSGProvider>
						}
					/>
					<Route
						path="A26"
						element={
							// <DSGProvider
							// 	keyColumn="CodeID"
							// 	otherColumns="CodeData,Other1">
							<A26Provider>
								<A26FrameContainer />
							</A26Provider>
							// </DSGProvider>
						}
					/>
					<Route
						path="C04"
						element={
							<ZZCrudProvider>
								<PurchaseProvider>
									<MockC04FrameContainer />
								</PurchaseProvider>
							</ZZCrudProvider>
						}
					/>
					{/* MODULE NOT FOUND */}
					<Route
						path="*"
						element={
							<InfoPage
								severity="warning"
								alertProps={
									{
										// maxWidth:
									}
								}
								title="找不到您要瀏覽的頁面"
								message="請聯絡系統管理員"
							/>
						}
					/>
				</Route>
			</Route>

			{/* PUBLIC PAGE NOT FOUND */}
			<Route
				path="*"
				element={
					<InfoPage
						severity="warning"
						alertProps={
							{
								// maxWidth:
							}
						}
						title="找不到您要瀏覽的頁面"
						message="請聯絡系統管理員"
					/>
				}
			/>
		</Routes>
	);
};

export default AppRoute;
