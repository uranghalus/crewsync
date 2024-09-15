import { IconType } from 'react-icons/lib';
import { RiDashboardHorizontalLine, RiDatabase2Line } from 'react-icons/ri';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: IconType;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/overview',
          label: 'Dashboard',
          active: pathname.includes('/overview'),
          icon: RiDashboardHorizontalLine,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Data',
      menus: [
        {
          href: '',
          label: 'Master Data',
          active: pathname.includes('/master-data'),
          icon: RiDatabase2Line,
          submenus: [
            {
              href: '/master-data/department',
              label: 'Department',
              active: pathname === '/master-data/department',
            },
            {
              href: '/master-data/user',
              label: 'Pengguna',
              active: pathname === '/master-data/user',
            },
          ],
        },
        // {
        //   href: '/categories',
        //   label: 'Categories',
        //   active: pathname.includes('/categories'),
        //   icon: RiBookmarkLine,
        //   submenus: [],
        // },
        // {
        //   href: '/tags',
        //   label: 'Tags',
        //   active: pathname.includes('/tags'),
        //   icon: RiPriceTag3Line,
        //   submenus: [],
        // },
      ],
    },
    // {
    //   groupLabel: 'Settings',
    //   menus: [
    //     {
    //       href: '/users',
    //       label: 'Users',
    //       active: pathname.includes('/users'),
    //       icon: RiUser2Line,
    //       submenus: [],
    //     },
    //     {
    //       href: '/account',
    //       label: 'Account',
    //       active: pathname.includes('/account'),
    //       icon: RiSettingsLine,
    //       submenus: [],
    //     },
    //   ],
    // },
  ];
}
