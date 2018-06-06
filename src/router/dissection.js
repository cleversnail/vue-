import dissection from 'components/dissection/dissection';
import home from 'components/dissection/home';
import count from 'components/dissection/count';
import answer from 'components/dissection/answer';
import rank from 'components/dissection/rank';
import library from 'components/dissection/library';
import chance from 'components/dissection/chance';
import blood from 'components/dissection/blood';
import result from 'components/dissection/result';
import introduce from 'components/dissection/introduce';

const dissections = [
  {
    path: '/dissection',
    name: 'dissection',
    component: dissection,
    children: [
      {
        path: '',
        name: 'dissectionHome',
        component : home,
      }, {
        path: 'count',
        name: 'dissectionCount',
        component : count,
      },{
        path: 'answer',
        name: 'dissectionAnswer',
        component : answer,
      },{
        path: 'rank',
        name: 'dissectionRank',
        component : rank,
      },{
        path: 'library',
        name: 'dissectionLibrary',
        component : library,
      },{
        path: 'chance',
        name: 'dissectionChance',
        component : chance,
      },{
        path: 'blood',
        name: 'dissectionBlood',
        component : blood,
      },{
        path: 'result',
        name: 'dissectionResult',
        component : result,
      },{
        path: 'introduce',
        name: 'dissectionIntroduce',
        component : introduce,
      },
    ]
  }
];

export default dissections;
