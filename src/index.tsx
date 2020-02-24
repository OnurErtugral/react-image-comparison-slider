import * as React from "react";

import "./imageSlider.css";

interface IProps {
  image1: string;
  image2: string;
  stickColor?: string;
  stickWidth?: number;
}

export default function ImageSlider({
  image1,
  image2,
  stickColor = "red",
  stickWidth = 5,
}: IProps) {
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
      setFromLeft(width / 2);
    }
  }, []);

  React.useEffect(() => {
    function handleMouseUp(e: MouseEvent | TouchEvent): void {
      setIsMouseDown(false);
    }

    function handleMouseMove(e: MouseEvent): void {
      if (containerRef && containerRef.current && isMouseDown) {
        const { left, width } = containerRef.current.getBoundingClientRect();

        if (e.pageX - left < 0) {
          setFromLeft(0);
        } else if (e.pageX > left + width) {
          setFromLeft(width);
        } else {
          setFromLeft(e.pageX - left);
        }
      }
    }

    function handleTouchMove(e: TouchEvent): void {
      if (containerRef && containerRef.current && isMouseDown) {
        const { left, width } = containerRef.current.getBoundingClientRect();

        if (e.touches[0].pageX - left < 0) {
          setFromLeft(0);
        } else if (e.touches[0].pageX > left + width) {
          setFromLeft(width);
        } else {
          setFromLeft(e.touches[0].pageX - left);
        }
      }
    }

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isMouseDown]);

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
        cursor: isMouseDown ? "pointer" : "default",
      }}
    >
      {fromLeft === null ? (
        "Loading"
      ) : (
        <>
          <div className="slider__container">
            <img
              alt="img1"
              src={image1}
              width={containerSize.width}
              height={containerSize.height}
            />
          </div>
          <div
            className="slider__container img-comp-overlay"
            style={{ width: fromLeft }}
          >
            <img
              alt="img2"
              src={image2}
              width={containerSize.width}
              height={containerSize.height}
            />
          </div>

          <div
            className="slider__stick"
            style={{
              left: fromLeft,
              backgroundColor: stickColor,
              width: stickWidth,
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          />
        </>
      )}
    </div>
  );
}
