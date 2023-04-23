# React Treasure Hunt

Treasure Hunt was built using React. The game contains styling with CSS elements.

## Installation

1. Open terminal/command prompt & git clone the repository onto your hard drive.
2. Download https://nodejs.org/en/download/ if not already installed.
3. Open terminal & CD into the directory where your files have been cloned
4. Once you are in the treasure-hunt-coding-dolls directory:
For mac:
Type yarn,*enter* then yarn start *enter*,
For windows:
Type npm start *enter*

## The Setup:
- 3 components
    - App.js
    - Board.js
    - Square.js
- App.js contains the board
- Board.js contains 9 squares represented in state like this:
    ``` javascript
    this.state = { spaces: [0, 0, 0, 0, 0, 0, 0, 0, 0] }
    ```

## User Stories
- As a player, I can see a web page with a 3 by 3 grid board game with question marks in each square.
- As a player, when I click on one of the anchor icons, the box reveals a wave icon, treasure icon, or bomb icon.
- As a player, I can click on the anchor icons and behind one of the icons is a treasure icon and an alert appears with the text “You Won!”
- As a player, I can see a counter that shows how many guesses I have left (starting at 5).
- As a player, I can see a “win” or “lose” message when the game is won or lost.
- As a player, I can click on a “Play Again” button to restart the game.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
