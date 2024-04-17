This component provides a pagination method with dots for any amount of images/slides.

<img src="https://i.imgur.com/TVIRA8z.gif" width="500" />

# Quickstart

    npm install --save react-carousel-dots

The minimum amount of code to make it work:

    import Dots from 'react-carousel-dots';

    <Dots length={10} active={0} />

# Props

| Name            | Default value | Description                                                                                                                 |
| --------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| length          | -             | Required. The amount of dots you want to use.                                                                               |
| active          | -             | Required. The index of the currently active dot.                                                                            |
| visible         | 5             | Optional. The amount of dots visible on mount.                                                                              |
| margin          | 1             | Optional. The right- and left-margin of a dot.                                                                              |
| className       | ''            | Optional. This class will be added to the holder div.                                                                       |
| onClick         | () => {}      | Optional. A function that will be called when a dot is clicked. The index of the clicked dot will be passed as an argument. |
| dotStyle        | {}            | Optional. An object with css properties that will be applied to all dots.                                                   |
| activeStyle     | {}            | Optional. An object with css properties that will be applied to the active dot.                                             |
| dotHolderHeight | 16            | Optional. The height of the holder div.                                                                                     |
| dotHolderWidth  | 16            | Optional. The width of the holder div.                                                                                      |
| removeSmallDots | false         | Optional. If true, the following and leading dots will be the same size as all other dots.                                  |
