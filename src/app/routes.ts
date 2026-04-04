import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { IntroScreen } from "./components/IntroScreen";
import { ChooseFlowerScreen } from "./components/ChooseFlowerScreen";
import { GrowthScreen } from "./components/GrowthScreen";
import { GardenScreen } from "./components/GardenScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: IntroScreen },
      { path: "choose", Component: ChooseFlowerScreen },
      { path: "grow", Component: GrowthScreen },
      { path: "garden", Component: GardenScreen },
    ],
  },
]);
