import bargain from 'components/bargain/bargain';
import home from 'components/bargain/home';
import detail from 'components/bargain/detail';
import rule from 'components/bargain/rule';

const resources = [
  {
    path: '/bargain',
    component: bargain,
    children: [
      {
        path: '',
        name: 'bargainHome',
        component : home,
      },
      {
        path: 'detail/:id',
        name: 'bargainDetail',
        component : detail,
      },
      {
        path: 'rule',
        name: 'bargainRule',
        component : rule,
      },
    ]
  },
];

export default resources;
