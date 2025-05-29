# pokedex-app

A simple Node.js and Express web app that lets you search for Pokémon by name or ID using the [PokeAPI](https://pokeapi.co/).

## Features

- Search for any Pokémon by name or ID
- Displays Pokémon sprite, types, and base stats
- Handles errors gracefully (shows a message if Pokémon is not found)

## Demo

![Demo Screenshot](https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ChrisM922/pokedex-app.git
   cd pokedex-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the App

Start the server:

```bash
node index.js
```

The app will be available at [http://localhost:3000](http://localhost:3000) (or another port if set via `PORT` environment variable).

## Usage

- Go to the home page and enter a Pokémon name (e.g., `pikachu`) or ID (e.g., `25`).
- View the Pokémon's details, including sprite, types, and stats.
- If the Pokémon is not found, an error message will be displayed.

## Project Structure

```
├── index.js           # Main server file
├── package.json       # Project metadata and dependencies
├── LICENSE            # GNU GPL v3 License
└── README.md          # Project documentation
```

## Dependencies

- [express](https://www.npmjs.com/package/express)
- [axios](https://www.npmjs.com/package/axios)

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Author

[ChrisM922](https://github.com/ChrisM922)
