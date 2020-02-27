# React Image Comparison Slider

<p align="center">
  <a href="https://raw.githubusercontent.com/OnurErtugral/react-image-comparison-slider/master/assets/ImageSlider.gif"><img src="assets/ImageSlider.gif" /></a>
</p>
<p align="middle">
  <i>Click above to play with the live demo.</i>
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

| Props                 |   Type   | Default | Description                                                       |
| --------------------- | :------: | :-----: | ----------------------------------------------------------------- |
| image1                |  string  |    -    | First image's source (URL, base64 string etc.)                    |
| image2                |  string  |    -    | Second image's source (URL, base64 string etc.)                   |
| alt1                  |  string  | `alt1`  | First image's alt text                                            |
| alt2                  |  string  | `alt2`  | Second image's alt text                                           |
| sliderColor           |  number  |  `red`  | Slider's color. Should be valid CSS color expression.             |
| sliderWidth           |  number  |    4    | Slider's width in pixel.                                          |
| handleBackgroundColor |  string  | "white" | Background color of the slider's handle.                          |
| handleColor           |  string  |  "red"  | Background color of the triangles on the slider's handle.         |
| sliderInitialPosition |  number  |   0.5   | Slider's initial position between 0 and 1.                        |
| onSlide               | function |    -    | A callback function which is invoked on slider's position change. |
