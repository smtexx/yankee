import { routes } from 'data/routes';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Layout from 'components/Layout/Layout';
import PageContact from 'components/PageContact/PageContact';
import PageHome from 'components/PageHome/PageHome';

const router = createBrowserRouter([
  {
    path: routes.root.path,
    element: <PageHome route={routes.root} />,
  },
  {
    path: routes.contact.path,
    element: <PageContact route={routes.contact} />,
  },
]);

export default function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}
