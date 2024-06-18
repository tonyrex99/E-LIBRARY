import AddTaskIcon from '@mui/icons-material/AddTask';
import Home from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub';
import { HomeOutlined } from '@mui/icons-material';
import { NotificationAddOutlined } from '@mui/icons-material';
import asyncComponentLoader from '@/utils/loader';
import { Pages, Routes } from './types';
import { BookOutlined } from '@mui/icons-material';
import { PeopleAltOutlined } from '@mui/icons-material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
const routes: Routes = {
  [Pages.Welcome]: {
    component: asyncComponentLoader(() => import('@/pages/Welcome')),
    path: '/',
    title: 'Welcome',
    icon: HomeOutlined,
    visible: false,
  },
  [Pages.Dashboard]: {
    component: asyncComponentLoader(() => import('@/pages/User/Dashboard')),
    path: '/dashboard',
    title: 'Home',
    icon: Home,
    visible: true,

    nested: {
      [Pages.Home]: {
        component: asyncComponentLoader(() => import('@/pages/User/Home')),
        path: '',
        icon: AddTaskIcon,
      },
      [Pages.Book]: {
        component: asyncComponentLoader(() => import('@/pages/User/Book')),
        path: ':book',
        icon: AddTaskIcon,
      },
      [Pages.RenewBook]: {
        component: asyncComponentLoader(() => import('@/pages/User/Book')),
        path: ':book/:renew',
        icon: AddTaskIcon,
      },
      [Pages.Notification]: {
        component: asyncComponentLoader(() => import('@/pages/User/Notification')),
        path: 'notification',
        title: 'Notification',
        icon: NotificationAddOutlined,
        visible: true,
        notChild: true,
      },

      [Pages.BookTransaction]: {
        component: asyncComponentLoader(() => import('@/pages/User/BookTransaction')),
        path: 'book-transaction',
        title: 'Book Transaction',
        icon: SwapHorizIcon,
        visible: true,
        notChild: true,
        nested: {
          [Pages.TransactionIndex]: {
            component: asyncComponentLoader(
              () => import('@/pages/User/BookTransaction/RootTransaction'),
            ),
            path: '',
            title: 'Book Transaction',
            icon: AddTaskIcon,
            visible: true,
          },
          [Pages.BorrowedBooks]: {
            component: asyncComponentLoader(() => import('@/pages/User/BorrowedBooks')),
            path: 'borrowed-books',
            title: 'Borrowed Books',
            icon: AddTaskIcon,
            visible: true,
          },
          [Pages.ReserveBooks]: {
            component: asyncComponentLoader(() => import('@/pages/User/BorrowedBooks')),
            path: 'borrowed-books/:reserve',
            title: 'Borrowed Books',
            icon: AddTaskIcon,
            visible: true,
          },
        },
      },

      [Pages.NotFound]: {
        component: asyncComponentLoader(() => import('@/pages/NotFound')),
        path: '*',
      },
    },
  },
  [Pages.AdminHome]: {
    component: asyncComponentLoader(() => import('@/pages/Admin/AdminHome')),
    path: '/admin',
    title: 'Home',
    visible: true,
    icon: HomeOutlined,
    nested: {
      [Pages.AdminHomeOverview]: {
        component: asyncComponentLoader(() => import('@/pages/Admin/AdminHomeOverview')),
        path: '',
        title: 'Home',
        icon: GitHubIcon,
      },

      [Pages.AdminBookManagement]: {
        component: asyncComponentLoader(() => import('@/pages/Admin/AdminBookManagement')),
        path: 'book-management',
        title: 'Book Management',
        visible: true,
        notChild: true,
        icon: BookOutlined,
        nested: {
          [Pages.AdminBookManagementRoot]: {
            component: asyncComponentLoader(() => import('@/pages/Admin/AdminBookManagement/Root')),
            path: '',
            icon: GitHubIcon,
          },

          [Pages.AdminBookManagementBorrowedBooks]: {
            component: asyncComponentLoader(
              () => import('@/pages/Admin/AdminBookManagementBorrowedBooks'),
            ),
            path: 'borrowed-books',
            title: 'Landng',
            icon: GitHubIcon,
          },

          [Pages.AdminBookManagementApprove]: {
            component: asyncComponentLoader(
              () => import('@/pages/Admin/AdminBookManagementApprove'),
            ),
            path: 'approve-extension',
            title: 'Landng',
            icon: GitHubIcon,
          },

          [Pages.AdminBookManagementAddBooks]: {
            component: asyncComponentLoader(
              () => import('@/pages/Admin/AdminBookManagementAddBooks'),
            ),
            path: 'add-books',
            title: 'Landng',
            icon: GitHubIcon,
          },
        },
      },

      [Pages.AdminNotifications]: {
        component: asyncComponentLoader(() => import('@/pages/Admin/AdminNotifications')),
        path: 'notifications',
        title: 'Notifications',
        visible: false,
        notChild: true,
        icon: NotificationAddOutlined,
      },

      [Pages.AdminManageUsers]: {
        component: asyncComponentLoader(() => import('@/pages/Admin/AdminManageUsers')),
        path: 'manage-users',
        title: 'Manage Users',
        visible: true,
        notChild: true,
        icon: PeopleAltOutlined,
      },
    },
  },
  [Pages.Login]: {
    component: asyncComponentLoader(() => import('@/pages/Login')),
    path: '/login',
    title: 'Login',
    icon: GitHubIcon,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
