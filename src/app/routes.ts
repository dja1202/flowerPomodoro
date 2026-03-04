import { createBrowserRouter } from 'react-router';
import { IntroScreen } from './screens/IntroScreen';
import { ChooseFlowerScreen } from './screens/ChooseFlowerScreen';
import { TimerScreen } from './screens/TimerScreen';
import { GardenScreen } from './screens/GardenScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: IntroScreen,
  },
  {
    path: '/choose',
    Component: ChooseFlowerScreen,
  },
  {
    path: '/timer/:flowerType',
    Component: TimerScreen,
  },
  {
    path: '/garden',
    Component: GardenScreen,
  },
]);
