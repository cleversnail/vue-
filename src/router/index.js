import Vue from 'vue';
import Router from 'vue-router';

import Index from 'components/Index';
import apply from 'components/apply';
import applyResult from 'components/applyResult';
import rate from 'components/rate';
import Hello from 'components/Hello';
import companyInfo from 'components/companyInfo';
import special from 'components/special';
import rank from 'components/rank';

import gameIndex from 'components/game/index';
import gameAnswer from 'components/game/answer';
import gameResult from 'components/game/result';
import gameResult2 from 'components/game/result2';
import gameHelp from 'components/game/help';
import gameRule from 'components/game/rule';
import gameLike from 'components/game/like';
import gameResolve from 'components/game/resolve';
import gameLottery from 'components/game/lottery';
import gameDial from 'components/game/dial';
import gameRank from 'components/game/rank';

import indexer from 'components/kepu/indexer';
import applyer from 'components/kepu/applyer';
import applyResulter from 'components/kepu/applyResulter';
import rateer from 'components/kepu/rateer';
import helloer from 'components/kepu/helloer';
import companyInfoer from 'components/kepu/companyInfoer';
import specialer from 'components/kepu/specialer';
import ranker from 'components/kepu/ranker';

// 劳动活动
import labourIndex from 'components/labour/labourIndex';
import labourRank from 'components/labour/labourRank';
import labourdetail from 'components/labour/labourdetail'

//投稿赚红包活动
import contribution from 'components/submission/contribution'
import contribute from 'components/submission/contribute'
import mysubmission from 'components/submission/mysubmission'
import subdetail from 'components/submission/subdetail'
import alreadysub from 'components/submission/alreadysub'
import nicesub from 'components/submission/nicesub'

import read from './read.js';
import medicalRoute from './medical.js';
import robot from './robot.js';
import anatomys from './anatomy.js'
import dissections from './dissection';
import resources from './resource';
import bargains from './bargain';
import bargains2 from './bargain2';
Vue.use(Router);

const routerArr = [
  ...read,
  ...medicalRoute,
  ...robot,
  ...anatomys,
  ...dissections,
  ...resources,
  ...bargains,
  ...bargains2,
  {
    path: '/labourdetail',
    name: 'labourdetail',
    component: labourdetail,
  },
  {
    path: '/labourIndex',
    name: 'labourIndex',
    component: labourIndex,
  },
  {
    path: '/labourRank',
    name: 'labourRank',
    component: labourRank,
  },
  {
    path: '/zuimei',
    name: 'Index',
    component: Index,
  },
  {
    path: '/zuimei/apply',
    name: 'apply',
    component: apply,
  },
  {
    path: '/applyResult',
    name: 'applyResult',
    component: applyResult,
  },
  {
    path: '/zuimei/rate/:id',
    name: 'rate',
    component: rate,
  },
  {
    path: '/zuimei/rank',
    name: 'rank',
    component: rank,
  },
  {
    path: '/zuimei/hello',
    name: 'hello',
    component: Hello,
  },
  {
    path:'/game',
    name:'gameIndex',
    component:gameIndex,
  },
  {
    path:'/game/resolve',
    name:'gameResolve',
    component:gameResolve,
  },
  {
    path:'/game/answer',
    name:'gameAnswer',
    component:gameAnswer,
  },
  {
    path:'/game/result',
    name:'gameResult',
    component:gameResult,
  },
  {
    path:'/game/result2',
    name:'gameResult2',
    component:gameResult2,
  },
  {
    path:'/game/help',
    name:'gameHelp',
    component:gameHelp,
  },
  {
    path:'/game/rule',
    name:'gameRule',
    component:gameRule,
  },
  {
    path:'/game/like/:id',
    name:'gameLike',
    component:gameLike,
  },
  {
    path:'/game/lottery/:type',
    name:'gameLottery',
    component:gameLottery,
  },
  {
    path:'/game/dial',
    name:'gameDial',
    component:gameDial,
  },
  {
    path: '/kepu',
    name: 'indexer',
    component: indexer
  },
  {
    path: '/kepu/applyer',
    name: 'applyer',
    component: applyer,
  },
  {
    path: '/kepu/applyResulter',
    name: 'applyResulter',
    component: applyResulter
  },
  {
    path: '/kepu/rateer/:id',
    name: 'rateer',
    component: rateer
  },
  {
    path: '/kepu/helloer',
    name: 'helloer',
    component: helloer
  },
  {
    path: '/kepu/companyInfoer',
    name: 'companyInfoer',
    component: companyInfoer
  },
  {
    path: '/kepu/specialer',
    name: 'specialer',
    component: specialer
  },
  {
    path: '/kepu/ranker',
    name: 'ranker',
    component: ranker
  },
 {
    path:'/game/rank',
    name:'gameRank',
    component:gameRank,
  },
  {
     path:'/contribution',
     name:'contribution',
     component:contribution,
   },
   {
     path: '/mysubmission',
     name: 'mysubmission',
     component: mysubmission,
   },
   {
     path: '/contribute',
     name: 'contribute',
     component: contribute,
   },
   {
     path: '/subdetail',
     name: 'subdetail',
     component: subdetail,
   },
   {
     path: '/alreadysub',
     name: 'alreadysub',
     component: alreadysub,
   },
   {
     path: '/nicesub',
     name: 'nicesub',
     component: nicesub,
   },
]
export default new Router({
  routes: routerArr
});
