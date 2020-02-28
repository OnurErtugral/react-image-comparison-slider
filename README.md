# React Image Comparison Slider

<p align="center">
  <a href="https://codesandbox.io/embed/elegant-jepsen-nfhyi"><img src="https://raw.githubusercontent.com/OnurErtugral/react-image-comparison-slider/master/assets/ImageSlider.gif" /></a>
</p>
<p align="middle">
  <i>Click above to play with <b>the live demo</b>.</i>
</p>

## Installation

```
npm install react-image-comparison-slider
```

or

```
yarn add react-image-comparison-slider
```

## Usage

```
import ImageSlider from "react-image-comparison-slider";

<div style={{ width: 700, height: 450 }}>
    <ImageSlider
        image1=""
        image2=""
        onSlide={() => {
          console.log("sliding");
        }}
    />
</div>
```

## Props

| Props                 |    Type     | Default | Description                                                       |
| --------------------- | :---------: | :-----: | ----------------------------------------------------------------- |
| image1                |   string    |    -    | First image's source (URL, base64 string etc.)                    |
| image2                |   string    |    -    | Second image's source (URL, base64 string etc.)                   |
| alt1                  |   string    | `alt1`  | First image's alt text                                            |
| alt2                  |   string    | `alt2`  | Second image's alt text                                           |
| sliderColor           |   number    |  `red`  | Slider's color. Should be valid CSS color expression.             |
| sliderWidth           |   number    |    4    | Slider's width in pixel.                                          |
| showHandle            |   boolean   |  true   | If false, hides slider handle.                                    |
| handleBackgroundColor |   string    | "white" | Background color of the slider's handle.                          |
| handleColor           |   string    |  "red"  | Background color of the triangles on the slider's handle.         |
| customHandle          | DOM Element |  null   | Renders the passed DOM element as a slider handle.                |
| sliderInitialPosition |   number    |   0.5   | Slider's initial position between 0 and 1.                        |
| leftLabelText         |   string    |  null   | A label for the first image.                                      |
| rightLabelText        |   string    |  null   | A label for the second image.                                     |
| onSlide               |  function   |    -    | A callback function which is invoked on slider's position change. |
| onLoadFirstImage      |  function   |    -    | Is invoked when the first image has finished loading.             |
| onLoadSecondImage     |  function   |    -    | Is invoked when the second image has finished loading.            |
| onErrorFirstImage     |  function   |    -    | Is invoked when an error occurs loading the first image           |
| onErrorSecondImage    |  function   |    -    | Is invoked when an error occurs loading the second image          |
| showPlaceholder       |   boolean   |  true   | Set placeholder's visibility.                                     |
| customPlaceholder     | DOM Element |  null   | Pass your custom placeholder component/element.                   |
