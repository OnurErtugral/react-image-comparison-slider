import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { mount } from "enzyme";
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

it("renders SliderHandle", () => {
  const wrapper = mount(<ImageSlider />);

  expect(wrapper.find("SliderHandle")).toHaveLength(1);
});

it("renders custom SliderHandle", () => {
  const customHandle = (
    <div
      style={{
        height: 20,
        width: 20,
        backgroundColor: "hotpink",
      }}
    />
  );
  const wrapper = mount(<ImageSlider customHandle={customHandle} />);

  expect(
    wrapper
      .find(".slider__handle")
      .childAt(0)
      .prop("style"),
  ).toEqual({
    height: 20,
    width: 20,
    backgroundColor: "hotpink",
  });
});

it("does not render SliderHandle, if showHandle is false", () => {
  const showHandle = false;
  const wrapper = mount(<ImageSlider showHandle={showHandle} />);

  expect(wrapper.find(".slider__handle").children()).toHaveLength(0);
});

it("renders labels", () => {
  const leftLabel = "dummy text left";
  const rightLabel = "dummy text right";
  const wrapper = mount(
    <ImageSlider leftLabelText={leftLabel} rightLabelText={rightLabel} />,
  );

  expect(
    wrapper
      .find(".slider__container")
      .at(0)
      .text(),
  ).toContain(rightLabel);

  expect(
    wrapper
      .find(".slider__container")
      .at(1)
      .text(),
  ).toContain(leftLabel);
});

it("invokes onLoad callbacks", () => {
  const onLoadFirstImage = jest.fn();
  const onLoadSecondImage = jest.fn();

  const wrapper = mount(
    <ImageSlider
      onLoadFirstImage={onLoadFirstImage}
      onLoadSecondImage={onLoadSecondImage}
    />,
  );

  wrapper
    .find(".slider__container")
    .at(0)
    .find("img")
    .simulate("load");
  expect(onLoadFirstImage).toBeCalledTimes(1);

  wrapper
    .find(".slider__container")
    .at(1)
    .find("img")
    .simulate("load");
  expect(onLoadSecondImage).toBeCalledTimes(1);
});

it("invokes onError callbacks", () => {
  const onErrorFirstImage = jest.fn();
  const onErrorSecondImage = jest.fn();

  const wrapper = mount(
    <ImageSlider
      onErrorFirstImage={onErrorFirstImage}
      onErrorSecondImage={onErrorSecondImage}
    />,
  );

  wrapper
    .find(".slider__container")
    .at(0)
    .find("img")
    .simulate("error");
  expect(onErrorFirstImage).toBeCalledTimes(1);

  wrapper
    .find(".slider__container")
    .at(1)
    .find("img")
    .simulate("error");
  expect(onErrorSecondImage).toBeCalledTimes(1);
});

it("does not show placeholders, if showPlaceholder prop is false", () => {
  const wrapper = mount(<ImageSlider showPlaceholder={false} />);

  expect(
    wrapper.find(".slider__container").children(".placeholder"),
  ).toHaveLength(0);

  expect(
    wrapper.find(".slider__container").children(".custom-placeholder__wrapper"),
  ).toHaveLength(0);
});

it("renders custom placeholders, if customPlaceholder prop exists", () => {
  const customPlaceholder = <div className="my-placeholder" />;
  const wrapper = mount(<ImageSlider customPlaceholder={customPlaceholder} />);

  // does not render default placeholders
  expect(
    wrapper.find(".slider__container").children(".placeholder"),
  ).toHaveLength(0);

  // does show custom placeholder
  expect(
    wrapper
      .find(".slider__container")
      .children(".custom-placeholder__wrapper")
      .children(".my-placeholder"),
  ).toHaveLength(2);
});

it("does not renders placeholders, if images have been loaded", () => {
  const customPlaceholder = <div className="my-placeholder" />;
  const wrapper = mount(<ImageSlider customPlaceholder={customPlaceholder} />);

  wrapper
    .find(".slider__container")
    .at(0)
    .find("img")
    .simulate("load");
  wrapper
    .find(".slider__container")
    .at(1)
    .find("img")
    .simulate("load");

  // does not render default placeholders
  expect(
    wrapper.find(".slider__container").children(".placeholder"),
  ).toHaveLength(0);

  // does not render custom placeholders
  expect(
    wrapper
      .find(".slider__container")
      .children(".custom-placeholder__wrapper")
      .children(".my-placeholder"),
  ).toHaveLength(0);
});

it("animates slider, and stops animation onClick on slider", () => {
  const width = 500;
  const animationCycleDuration = 5000;
  const sliderInitialPosition = 0.5;
  const step = Math.round((width / animationCycleDuration) * 16.6 * 100) / 100;

  jest.spyOn(window, "requestAnimationFrame").mockImplementation(cb => null);
  jest
    .spyOn(Element.prototype, "getBoundingClientRect")
    .mockImplementation(() => {
      return {
        width: width,
        height: 500,
      };
    });
  const cancelAnimationSpy = jest.spyOn(window, "cancelAnimationFrame");

  const wrapper = mount(
    <ImageSlider
      sliderInitialPosition={sliderInitialPosition}
      animate={true}
      animationCycleDuration={animationCycleDuration}
    />,
  );

  expect(window.requestAnimationFrame).toBeCalledTimes(1);
  expect(wrapper.find(".slider__stick").prop("style")).toHaveProperty(
    "left",
    width * sliderInitialPosition + step,
  );

  // cancels animation on click
  wrapper.find(".slider__stick").simulate("mousedown");
  expect(cancelAnimationSpy).toBeCalledTimes(1);
});

it("trigers onSlideEnd callback, upon mouseUp", () => {
  const map = {};
  document.addEventListener = jest.fn((event, cb) => {
    map[event] = cb;
  });

  const onSlideEnd = jest.fn();

  const wrapper = mount(<ImageSlider onSlideEnd={onSlideEnd} />);

  wrapper.find(".slider__stick").simulate("mousedown");

  act(() => {
    map.mousemove({ pageX: 100, pageY: 100 });
    map.mouseup({ pageX: 100, pageY: 100 });
  });

  expect(onSlideEnd).toBeCalledTimes(1);
});
