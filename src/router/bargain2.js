import bargain2 from 'components/bargain2/bargain2';
import home from 'components/bargain2/home';
import detail from 'components/bargain2/detail';
import rule from 'components/bargain2/rule';
import rank from 'components/bargain2/rank';

const resources = [
  {
    path: '/bargain2',
    component: bargain2,
    children: [
      {
        path: '',
        name: 'bargain2Home',
        component : home,
      },
      {
        path: 'detail/:id',
        name: 'bargain2Detail',
        component : detail,
      },
      {
        path: 'rule',
        name: 'bargain2Rule',
        component : rule,
      },
      {
        path: 'rank',
        name: 'bargain2Rank',
        component : rank,
      },
    ]
  },
];

export default resources;
