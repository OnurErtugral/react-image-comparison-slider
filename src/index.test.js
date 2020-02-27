import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";

import ImageSlider from "./index.tsx";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  jest.restoreAllMocks();
  jest.resetAllMocks();

  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("prints Loading", () => {
  const wrapper = shallow(<ImageSlider />);

  expect(wrapper.text()).toContain("Loading");
});

it("prints first image's default alt text", () => {
  const wrapper = mount(<ImageSlider />);

  expect(
    wrapper
      .find("img")
      .at(0)
      .prop("alt"),
  ).toBe("alt1");
});

it("prints second image's default alt text", () => {
  const wrapper = mount(<ImageSlider />);

  expect(
    wrapper
      .find("img")
      .at(1)
      .prop("alt"),
  ).toBe("alt2");
});

it("prints first images custom alt text", () => {
  const wrapper = mount(<ImageSlider alt1="this is alt text" />);

  expect(
    wrapper
      .find("img")
      .at(0)
      .prop("alt"),
  ).toBe("this is alt text");
});

it("prints second images custom alt text", () => {
  const wrapper = mount(<ImageSlider alt1="this is alt text" />);

  expect(
    wrapper
      .find("img")
      .at(0)
      .prop("alt"),
  ).toBe("this is alt text");
});

it("changes slider color", () => {
  const bgColor = "hotpink";
  const wrapper = mount(<ImageSlider sliderColor={bgColor} />);

  expect(wrapper.find(".slider__stick").prop("style")).toHaveProperty(
    "backgroundColor",
    bgColor,
  );
});

it("changes slider width", () => {
  const sliderWidth = 3;
  const wrapper = mount(<ImageSlider sliderWidth={sliderWidth} />);

  expect(wrapper.find(".slider__stick").prop("style")).toHaveProperty(
    "width",
    sliderWidth,
  );
});

it("cursor changes when clicked on slider", () => {
  const map = {};
  document.addEventListener = jest.fn((event, cb) => {
    map[event] = cb;
  });

  const wrapper = mount(<ImageSlider />);

  wrapper.find(".slider__stick").simulate("mousedown");
  expect(wrapper.find(".slider__wrapper").prop("style")).toHaveProperty(
    "cursor",
    "ew-resize",
  );

  act(() => {
    map.mouseup();
    map.mousemove({ pageX: 100, pageY: 100 });
  });
  wrapper.update();

  expect(wrapper.find(".slider__wrapper").prop("style")).toHaveProperty(
    "cursor",
    "default",
  );
});

it("trigers onSlide callback, upon mouseMove", () => {
  const map = {};
  document.addEventListener = jest.fn((event, cb) => {
    map[event] = cb;
  });

  const onSlide = jest.fn();

  const wrapper = mount(<ImageSlider onSlide={onSlide} />);

  wrapper.find(".slider__stick").simulate("mousedown");

  act(() => {
    map.mousemove({ pageX: 100, pageY: 100 });
  });

  expect(onSlide).toBeCalled();
});
