
[![][hero]][hero]

[hero]: https://contrast.now.sh/cff/40f?size=256

# Contrast Swatch

Image microservice for color contrast information

[![][a]][a]
[![][b]][b]
[![][c]][c]

[a]: https://contrast.now.sh/bcf/409
[b]: https://contrast.now.sh/98f/206
[c]: https://contrast.now.sh/fff/40f

## Usage

Contrast swatch images can be used in any place an image is rendered.
The URL accepts a foreground and background color.

[`https://contrast.now.sh/cff/40f`][example]

[example]: https://contrast.now.sh/cff/40f

**HTML**

```html
<img src="https://contrast.now.sh/fff/07c" alt="color contrast indicator" />
```

**Markdown**

```md
![color contrast indicator](https://contrast.now.sh/fff/07c)
```

## React

You can wrap the image in a React component (or any templating engine) for generating documentation.

```js
import React from 'react'

export default ({
  foreground,
  background,
  ...props
}) =>
  <img
    {...props}
    src={`https://contrast.now.sh/${foreground}/${background}`}
    alt='color contrast indicator'
  />
```

## Customization

Use URL queries to customize the styles.

```
https://contrast.now.sh/fff/40f?width=256&height=96&fontSize=1.25
```

**Pass/Fail Label**

[![][pass]][pass]
[![][fail]][fail]

[pass]: https://contrast.now.sh/cff/40f?width=256&height=128&label=1
[fail]: https://contrast.now.sh/a6f/40f?width=256&height=128&label=1

**Font Size**

[![][smallfont]][smallfont]
[![][largefont]][largefont]

[smallfont]: https://contrast.now.sh/cff/40f?width=256&height=128&fontSize=0.5
[largefont]: https://contrast.now.sh/cff/40f?width=256&height=128&fontSize=2

**Size**

[![][large]][large]
[![][small]][small]

[large]: https://contrast.now.sh/cff/40f?size=320
[small]: https://contrast.now.sh/cff/40f?size=48

**Width & Height**

[![][wide]][wide]
[![][tall]][tall]

[wide]: https://contrast.now.sh/cff/40f?width=256&height=48
[tall]: https://contrast.now.sh/cff/40f?width=32&height=48

**Custom Text**

[![][text]][text]

[text]: https://contrast.now.sh/cff/40f?width=256&text=Aa

**Font Weight**

[![][weight]][weight]

[weight]: https://contrast.now.sh/cff/40f?width=256&fontWeight=900

**Radius**

[![][rounded]][rounded]
[![][circle]][circle]

[rounded]: https://contrast.now.sh/cff/40f?width=256&radius=4
[circle]: https://contrast.now.sh/cff/40f?width=256&radius=32

## Options


Option | Description
---|---
`size`      | Width & height in pixels
`width`     | Width of image in pixels
`height`    | Height of image in pixels (font size will scale based on height)
`fontSize`  | Relative font size (default 1)
`fontWeight`| Font weight (default 1)
`label`     | Show a pass/fail label based on the [WCAG Criteria][wcag]
`radius`    | Border radius
`baseline`   | Shift text baseline down
`text`      | Render any custom text

## Metadata

A JSON response with color contrast information can be fetched by adding the `type=json` query to the URL.

```
https://contrast.now.sh/cff/40f?type=json
```

**Note:** the returned JSON schema might change in a future version

[wcag]: https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html

## Related

- [Colorable](https://colorable.jxnblk.com)
- [Use Contrast](https://usecontrast.com/)

MIT License
