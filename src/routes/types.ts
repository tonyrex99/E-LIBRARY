import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

import type { SvgIconProps } from '@mui/material/SvgIcon';

enum Pages {
  Welcome,

  Home,
  Page4,
  Landing,
  Dashboard,
  Login,
  Book,
  RenewBook,
  BookTransaction,
  NotFound,
  BorrowedBooks,
  TransactionIndex,
  Notification,
  Search,
  ReserveBooks,
  ReturnBorrowedBooks,
  /**admin pages */
  AdminHome,
  AdminLogin,
  AdminHomeOverview,
  AdminBookManagement,
  AdminBookManagementRoot,
  AdminBookManagementBorrowedBooks,
  AdminBookManagementApprove,
  AdminBookManagementApproveBorrow,
  AdminBookManagementAddBooks,
  AdminNotifications,
  AdminManageUsers,
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?: FC<SvgIconProps>;
  visible?: boolean;
  notChild?: boolean;
  nested?: Partial<Record<Pages, PathRouteProps & PathRouteCustomProps>>;
};

type Routes = Partial<Record<Pages, PathRouteProps & PathRouteCustomProps>>;
export type { Routes };
export { Pages };
