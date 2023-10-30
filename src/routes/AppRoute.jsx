import { Navigate, Route, Routes } from "react-router-dom";

import { CrudProvider } from "@/contexts/crud/CrudProvider";
import MockC04Page from "@/mock-pages/MockC04Page";
import ProtectedRoute from "@/routes/ProtectedRoute";
import SignInRoute from "@/routes/SignInRoute";
import InfoPage from "@/shared-pages/InfoPage";
import { ProdsProvider } from "@/contexts/prods/ProdsProvider";
import { PurchaseProvider } from "@/contexts/purchase/PurchaseProvider";
import SignIn from "@/pages/auth/SignIn";
import SignInX from "@/pages/auth/SignInX";
import Home from "@/pages/Home";
import { LoadingFrame } from "@/shared-components/protected-page/LoadingFrame";
import HomeContainer from "@/pages/HomeContainer";
import MockA01FrameContainer from "../mock-pages/MockA01FrameContainer";
import A02Frame from "../pages/A02Frame";
import A02Provider from "../contexts/A02Provider";

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
					<Route
						path="A01"
						element={
							<CrudProvider>
								<ProdsProvider>
									<MockA01FrameContainer />
								</ProdsProvider>
							</CrudProvider>
						}
					/>
					{/* A02 */}
					<Route
						path="A02"
						element={
							<A02Provider>
								<A02Frame />
							</A02Provider>
						}
					/>
					<Route
						path="C04"
						element={
							<CrudProvider>
								<PurchaseProvider>
									<MockC04Page />
								</PurchaseProvider>
							</CrudProvider>
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
