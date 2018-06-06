import read_plan from 'components/read/read_plan';
import rank from 'components/read/rank';
import share from 'components/read/share';

 const read = [
  {
    path: '/read_plan',
    name: 'read_plan',
    component: read_plan,
  },
  {
    path: '/read_plan/rank',
    name: 'rank',
    component: rank,
  },
  {
    path: '/read_plan/share',
    name: 'share',
    component: share,
  }
];
export default read;
