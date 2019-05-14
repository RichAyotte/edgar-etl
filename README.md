# EDGAR ETL Challenge

Stream it, log it, pipe it!

## Getting Started

These instructions will get you a copy of the project and running *EDGAR ETL* on your local machine.

### Prerequisites

You'll need the following software installed.

```
git
mysql
node
yarn
```

### Installing

Clone the repo

```sh
git clone https://github.com/RichAyotte/edgar.git
```

Change to the project directory and install node packages

```sh
cd edgar
yarn
```

Create a dev database

```sh
mysqladmin -u root -p create edgar_dev
```

Create schema

```sh
cat edgar.sql | mysql -u root -p edgar_dev
```

Create a file named `local.js` in the `config` directory and put the following content. Replace the user and password with valid values.

```js
'use strict'

module.exports = {
	db: {
		database: 'edgar_dev'
		, password: 'secret-password'
		, user: 'etl_app'
	}
}
```

Reset the database and load it with a test ETL process

```sh
node reset-database.js
```

## Tests

### Unit

```
yarn test
```

### Lint

```
yarn lint
```

## Running

```
node index.js
```

## Authors

* **Richard Ayotte** - [Ayotte Software](https://ayottesoftware.com)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details