import * as React from "react";

import "./imageSlider.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import SliderHandle from "../assets/SliderHandle.js";

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IProps {
  image1: string;
  image2: string;
  alt1?: string;
  alt2?: string;
  sliderColor?: string;
  sliderWidth?: number;
  sliderInitialPosition?: number;
  onSlide?: () => void;
  handleBackgroundColor?: string;
  handleColor?: string;
  showHandle?: boolean;
  customHandle?: JSX.Element | null;
  leftLabelText?: string | null;
  rightLabelText?: string | null;
  onLoadFirstImage?: () => void;
  onLoadSecondImage?: () => void;
  onErrorFirstImage?: () => void;
  onErrorSecondImage?: () => void;
}

export default function ImageSlider({
  image1,
  image2,
  alt1 = "alt1",
  alt2 = "alt2",
  sliderColor = "red",
  sliderWidth = 3,
  sliderInitialPosition = 0.5,
  onSlide,
  handleBackgroundColor = "white",
  handleColor = "red",
  showHandle = true,
  customHandle = null,
  leftLabelText = null,
  rightLabelText = null,
  onLoadFirstImage,
  onLoadSecondImage,
  onErrorFirstImage,
  onErrorSecondImage,
}: IProps): JSX.Element {
  const [fromLeft, setFromLeft] = React.useState<number | null>(null);
  const [isMouseDown, setIsMouseDown] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = React.useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  React.useEffect(() => {
    if (containerRef && containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerSize({
        width,
        height,
      });
      setFromLeft(width * sliderInitialPosition);
    }
  }, [sliderInitialPosition]);

  React.useEffect(() => {
    function handleMouseUp(e: MouseEvent | TouchEvent): void {
      setIsMouseDown(false);
    }

    function handleMouseMove(e: MouseEvent): void {
      if (containerRef && containerRef.current && isMouseDown) {
        const { left, width } = containerRef.current.getBoundingClientRect();
        onSlide && onSlide();

        if (e.pageX - left < 0) {
          setFromLeft(0 - sliderWidth / 2);
        } else if (e.pageX > left + width) {
          setFromLeft(width - sliderWidth / 2);
        } else {
          setFromLeft(e.pageX - left);
        }
      }
    }

    function handleTouchMove(e: TouchEvent): void {
      if (containerRef && containerRef.current && isMouseDown) {
        const { left, width } = containerRef.current.getBoundingClientRect();

        if (e.touches[0].pageX - left < 0) {
          setFromLeft(0 - sliderWidth / 2);
        } else if (e.touches[0].pageX > left + width) {
          setFromLeft(width - sliderWidth / 2);
        } else {
          setFromLeft(e.touches[0].pageX - left);
        }
      }
    }

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);

    return (): void => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isMouseDown, onSlide, sliderWidth]);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ): void => {
    e.stopPropagation();
    setIsMouseDown(true);
  };

  return (
    <div
      className="slider__wrapper"
      ref={containerRef}
      style={{
        cursor: isMouseDown ? "ew-resize" : "default",
      }}
    >
      {fromLeft === null ? (
        "Loading"
      ) : (
        <>
          <div className="slider__container">
            <img
              alt={alt1}
              src={image1}
              width={containerSize.width}
              height={containerSize.height}
              onLoad={(): void => {
                onLoadFirstImage && onLoadFirstImage();
              }}
              onError={(): void => {
                onErrorFirstImage && onErrorFirstImage();
              }}
            />
            {rightLabelText && (
              <div className="label__text label__right">{rightLabelText}</div>
            )}
          </div>

          <div
            className="slider__container img-comp-overlay"
            style={{ width: fromLeft <= 0 ? 0 : fromLeft }}
          >
            <img
              alt={alt2}
              src={image2}
              width={containerSize.width}
              height={containerSize.height}
              onLoad={(): void => {
                onLoadSecondImage && onLoadSecondImage();
              }}
              onError={(): void => {
                onErrorSecondImage && onErrorSecondImage();
              }}
            />
            {leftLabelText && (
              <div className="label__text label__left">{leftLabelText}</div>
            )}
          </div>

          <div
            className="slider__stick"
            style={{
              left: fromLeft,
              backgroundColor: sliderColor,
              width: sliderWidth,
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <div className="slider__handle">
              {showHandle ? (
                customHandle ? (
                  customHandle
                ) : (
                  <SliderHandle
                    backgroundColor={handleBackgroundColor}
                    color={handleColor}
                  />
                )
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
