import styled from "@emotion/styled";

const Box = styled.div();

const Flex = styled.div({
  display: "flex"
});

const VStack = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 8
});

const HStack = styled.div({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  gap: 8
});

const Center = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

export { Box, Flex, VStack, HStack, Center };