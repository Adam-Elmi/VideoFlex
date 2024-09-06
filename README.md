# NobleUtils - `videoFlex` Utility

## Function: `videoFlex(videoElement, width)`

### Parameters:

- **`videoElement`** (`HTMLElement`): The HTML element representing the video. This function will only process if the element is a video. It should be a valid HTML `<video>` element with a source ending in a video file extension.
  
- **`width`** (`number`): The width of the video as a percentage of its container. It should be a number between 20 and 100, using increments of 20 for optimal responsiveness (e.g., 20, 40, 60, 80, 100).

### Description:

The `videoFlex` function makes a video element responsive to different screen sizes. It applies CSS styles to ensure the video maintains proper proportions and fits well within its container. Additionally, it adjusts reel videos with long heights to be responsive and ensures videos with long heights are handled correctly.

### How It Works:

1. **Check Video Element**:
   - The function verifies if the `videoElement`'s source ends with a known video file extension (e.g., `.mp4`, `.avi`, `.mov`). If not, it exits without making changes.

2. **Adjust Parent Element Styles**:
   - The width of the parent container is set based on the provided `width` parameter.
   - The height is calculated using a formula that maintains a responsive aspect ratio.
   - If the parent element does not have a `position` property, it is set to `relative`.

3. **Apply Initial Video Styles**:
   - The video is styled to be responsive within its container.
   - The video element is positioned absolutely within its parent to cover the container.

4. **Handle Full-Screen Mode**:
   - A separate function adjusts the video and its parent container to 100% width and height when the video enters full-screen mode.

### Height Based on Width

The table below describes the height adjustments based on the width percentage:

| Width (%) | Height (vw) | Description                                 |
|-----------|-------------|---------------------------------------------|
| 20        | 30          | Minimum height for very small widths        |
| 40        | 60          | Intermediate height for moderate widths     |
| 60        | 85          | Larger height for larger widths             |
| 80        | 100         | Maximum height for larger widths            |
| 100       | 100         | Full height when width is at 100%           |

### Example Usage

```javascript
const video = document.getElementById('video');
videoFlex(video, 80); // Test with a width that falls between 60-80
```

### HTML Example

To use `videoFlex`, ensure you wrap the `videoElement` with a `div` or other container element:



**Note:** Wrap the `videoElement` with a `div` to apply the responsive styles correctly. The `videoFlex` function also ensures that reel videos with long heights and other videos with extended heights are handled responsively.

### `For example:`

```html
<div>
   <video src='/vinland-saga.mp4' controls></video>
</div>
```

### Installation

Installation details for NobleUtils will be provided soon. 