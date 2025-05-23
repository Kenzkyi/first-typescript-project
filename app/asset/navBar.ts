import overviewIcon from '@/app/asset/public/overview.svg';
import overviewIconActive from '@/app/asset/public/overviewActive.png';
import transactionsIcon from '@/app/asset/public/transactions.svg';
import transactionsActive from '@/app/asset/public/transactionsActive.png';
import budgetsIcon from '@/app/asset/public/budgets.svg';
import budgetsActive from '@/app/asset/public/budgetsActive.png';
import potsIcon from '@/app/asset/public/pots.svg';
import potsActive from '@/app/asset/public/potsActive.png';
import billsIcon from '@/app/asset/public/bills.svg';
import billsActive from '@/app/asset/public/billsActive.png';
export default [
    {
        iconActive: overviewIconActive,
        icon: overviewIcon,
        name: 'Overview',
        path: '/dashboard'
    },
    {
        iconActive: transactionsActive,
        icon: transactionsIcon,
        name: 'Transactions',
        path: '/dashboard/transactions'
    },
    {
        iconActive: budgetsActive,
        icon: budgetsIcon,
        name: 'Budgets',
        path: '/dashboard/budgets'
    },
    {
        iconActive: potsActive,
        icon: potsIcon,
        name: 'Pots',
        path: '/dashboard/pots'
    },
    {
        iconActive: billsActive,
        icon: billsIcon,
        name: 'Recurring Bills',
        path: '/dashboard/recurring-bills'
    },
]