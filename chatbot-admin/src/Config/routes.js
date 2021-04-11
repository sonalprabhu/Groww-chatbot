/**
 * Contains all the required navigation paths
 */
import AddCategoryForm from '../components/AddCategoryForm';
import AddFaqForm from '../components/AddFaqForm';
import LoginForm from '../components/LoginForm';

const routes = [
    {
        path: '/add_faq',
        component: AddFaqForm,
        isPrivate: true,
    },
    {
        path: '/admin_login',
        component: LoginForm,
        isPrivate: false,
    },
    {
        path: '/add_category',
        component: AddCategoryForm,
        isPrivate: true,
    }
]
export default routes;