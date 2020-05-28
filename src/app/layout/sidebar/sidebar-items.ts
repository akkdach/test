import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '', title: 'Home', icon: 'fas fa-tachometer-alt', class: 'menu-toggle',
        submenu: [
            { path: '/dashboard/main', title: 'Dashboard 1', icon: '', class: 'ml-menu', submenu: [] },
            { path: '/dashboard/dashboard2', title: 'Dashboard 2', icon: '', class: 'ml-menu', submenu: [] },
            { path: '/dashboard/dashboard3', title: 'Dashboard 3', icon: '', class: 'ml-menu', submenu: [] }
        ]
    },
    {
        path: '', title: 'พนักงาน', icon: 'fas fa-user', class: 'menu-toggle',
        submenu: [
            { path: '/employee/salary', title: 'เงินเดือน', icon: '', class: 'ml-menu', submenu: [] },
            
            { path: '/employee/import-data', title: 'นำเข้าข้อมูลพนักงาน', icon: '', class: 'ml-menu', submenu: [] },
        ]
    },
    {
        path: '', title: 'เงินได้ / เงินหัก', icon: 'fas fa-user', class: 'menu-toggle',
        submenu: [
            { path: '/employee/deduction-list', title: 'รายการเงินหักประจำเดือน', icon: '', class: 'ml-menu', submenu: [] },
            { path: '/employee/installment', title: 'ตารางค่างวดรถ', icon: '', class: 'ml-menu', submenu: [] },
            { path: '/deduction/loan', title: 'สัญญาเงินกู้ / รับสภาพหนี้', icon: '', class: 'ml-menu', submenu: [] },
            { path: '/deduction/advance', title: 'เงินเบิกล่วงหน้า', icon: '', class: 'ml-menu', submenu: [] },
            { path: '/deduction/deduction-std', title: 'เงินหัก', icon: '', class: 'ml-menu', submenu: [] },
            { path: '/deduction/deduction-im', title: 'เงินหักอื่นๆ', icon: '', class: 'ml-menu', submenu: [] },
        ]
    },
    {
        path: '', title: 'Authentication', icon: 'fas fa-id-card', class: 'menu-toggle',
        submenu: [
            { path: '/authentication/signin', title: 'Sign In', icon: '', class: 'ml-menu', submenu: [] },
            { path: '/authentication/signup', title: 'Sign Up', icon: '', class: 'ml-menu', submenu: [] },
            { path: '/authentication/forgot-password', title: 'Forgot Password', icon: '', class: 'ml-menu', submenu: [] },
            { path: '/authentication/locked', title: 'Locked', icon: '', class: 'ml-menu', submenu: [] },
            { path: '/authentication/page404', title: '404 - Not Found', icon: '', class: 'ml-menu', submenu: [] },
            { path: '/authentication/page500', title: '500 - Server Error', icon: '', class: 'ml-menu', submenu: [] }
        ]
    },
];

