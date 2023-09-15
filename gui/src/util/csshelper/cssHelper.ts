import AnimationHelper from './helpers/AnimationHelper.ts';
import DefaultStyleHelper from './helpers/DefaultStyleHelper.ts';
import DesignHelper from './helpers/DesignHelper.ts';
import LayoutHelper from './helpers/LayoutHelper.ts';
import MediaQueryHelper from './helpers/MediaQueryHelper.ts';
import MiscStyleHelper from './helpers/MiscStyleHelper.ts';
import { Box, Flex, VStack, HStack, Center } from "@/util/csshelper/base_components.ts";

const animationHelper = new AnimationHelper();
const defaultStyleHelper = new DefaultStyleHelper();
const designHelper = new DesignHelper();
const layoutHelper = new LayoutHelper();
const mediaQueryHelper = new MediaQueryHelper();
const miscStyleHelper = new MiscStyleHelper();

const _ = {
  ...animationHelper,
  ...defaultStyleHelper,
  ...designHelper,
  ...layoutHelper,
  ...mediaQueryHelper,
  ...miscStyleHelper,
};

export { _, Box, Flex, VStack, HStack, Center };
