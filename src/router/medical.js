import medical from 'components/medical/medical';
import medicalResult from 'components/medical/medicalResult';

const medicalRoute = [
  {
    path: '/medical',
    name: 'medical',
    component: medical,
  },
  {
    path: '/medicalresult',
    name: 'medicalResult',
    component: medicalResult,
  }
];
export default medicalRoute;
