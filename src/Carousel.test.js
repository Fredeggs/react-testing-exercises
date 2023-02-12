import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// smoke test
it("renders without crashing", () => {
  render(<Carousel />);
});

// snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, not the second or third
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Josh Post on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
});

it("has a right arrow and a missing left arrow on the first image", function () {
  const { queryByTestId } = render(<Carousel />);

  // expect the first image to show, not the second or third
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
  expect(queryByTestId("right-arrow")).toBeInTheDocument();
});

it("has a left arrow and a missing right arrow on the third image", function () {
  const { queryByTestId } = render(<Carousel />);

  // move forward twice in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect the first image to show, not the second or third
  expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
  expect(queryByTestId("left-arrow")).toBeInTheDocument();
});
