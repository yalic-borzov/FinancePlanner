// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
//
// interface PrivateRouteProps {
//   children: React.ReactNode;
//   path: string;
// }
//
// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, path }) => {
//   const { isAuthenticated } = useAuth();
//
//   return (
//     <Route
//       path={path}
//       element={isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />}
//     />
//   );
// };
//
// export default PrivateRoute;
