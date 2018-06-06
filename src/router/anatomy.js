import anatomy from 'components/anatomy/anatomy';
import home from 'components/anatomy/home';
import classify from 'components/anatomy/classify';
import introduce from 'components/anatomy/introduce';
import rank from 'components/anatomy/rank'
import detail from 'components/anatomy/detail';
import unlock from 'components/anatomy/unlock';
import myUnlock from 'components/anatomy/myUnlock';
const anatomys = [
  {
    path: '/anatomy',
    name: 'anatomy',
    component: anatomy,
    children: [
      {
        path: 'home',
        name: 'anatomyHome',
        component : home,
      },
      {
        path: 'classify/:id',
        name: 'classify',
        component : classify,
      },
      {
        path: 'introduce',
        name: 'introduce',
        component : introduce,
      },
      {
        path: 'rank',
        name: 'anatomyRank',
        component: rank,
      },
      {
        path: 'detail/:id',
        name: 'anatomyDetail',
        component : detail,
      },
      {
        path: 'unlock',
        name: 'anatomyUnlock',
        component : unlock,
      },
      {
        path: 'myUnlock',
        name: 'anatomyMyUnlock',
        component : myUnlock,
      },
    ]
  },
];

export default anatomys;
