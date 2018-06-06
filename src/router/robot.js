import robot from 'components/robot/robot';
import count from 'components/robot/count';
import detail from 'components/robot/detail';
import subject from 'components/robot/subject';
import tagging from 'components/robot/tagging';
import backCT from 'components/robot/backCT';
import taggingDetail from 'components/robot/tagging-detail';
import taggingResult from 'components/robot/tagging-result';
import robotRank from 'components/robot/robot-rank';
import chance from 'components/robot/chance';
import blood from 'components/robot/blood';

const robots = [
  {
    path: '/robot',
    name: 'robot',
    component: robot,
  },
  {
    path: '/count',
    name: 'count',
    component: count,
  },
  {
    path: '/detail',
    name: 'detail',
    component: detail,
  },
  {
    path: '/subject',
    name: 'subject',
    component: subject,
  },
  {
    path: '/tagging',
    name: 'tagging',
    component: tagging,
  },
  {
    path: '/backCT',
    name: 'backCT',
    component: backCT,
  },
  {
    path: '/taggingDetail',
    name: 'taggingDetail',
    component: taggingDetail,
  },
  {
    path: '/taggingResult',
    name: 'taggingResult',
    component: taggingResult,
  },
  {
    path: '/robotRank',
    name: 'robotRank',
    component: robotRank,
  },
  {
    path: '/chance',
    name: 'chance',
    component: chance,
  },
  {
    path: '/blood',
    name: 'blood',
    component: blood,
  },
]

export default robots;
