import resource from 'components/resource/resource';
import home from 'components/resource/home';
import result from 'components/resource/result';
import receive from 'components/resource/receive';
import message from 'components/resource/message'
// import detail from 'components/anatomy/detail';
// import unlock from 'components/anatomy/unlock';
// import myUnlock from 'components/anatomy/myUnlock';
const resources = [
  {
    path: '/resource',
    component: resource,
    children: [
      {
        path: '',
        name: 'resourceHome',
        component : home,
      },
      {
        path: 'result',
        name: 'resourceResult',
        component : result,
      },
      {
        path: 'receive/:id',
        name: 'resourceReceive',
        component : receive,
      },
      {
        path: 'message',
        name: 'resourceMessage',
        component : message,
      },
    ]
  },
];

export default resources;
