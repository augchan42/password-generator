<!-- markdownlint-disable MD033 MD041 -->

<img
  src="https://kura.pro/password-generator-pro/images/logos/password-generator-pro.webp"
  alt="Password Generator Logo"
  width="261"
  align="right"
/>

<!-- markdownlint-enable MD033 MD041 -->

# Password Generator

A fast, simple, and powerful open-source utility tool for generating strong, unique, and random passwords. The Password Generator supports various types of passwords including base64-encoded, memorable, and complex strong passwords. It is designed to be a versatile tool for both personal and enterprise needs, ensuring that all users have access to high-security password options. Password Generator is free to use as a secure password generator on any computer, phone, or tablet.

[![Getting Started](https://kura.pro/common/images/buttons/button-primary.svg)](#installation)
[![Download the Password Generator Tool v1.1.3](https://kura.pro/common/images/buttons/button-secondary.svg)](https://github.com/sebastienrousseau/password-generator/archive/refs/tags/1.1.3.zip)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/0acb169c95e443729551979e0fd86eaf)](https://www.codacy.com?utm_source=github.com&utm_medium=referral&utm_content=sebastienrousseau/password-generator&utm_campaign=Badge_Grade)
[![npm](https://img.shields.io/npm/v/@sebastienrousseau/password-generator.svg?style=flat&color=success)](https://www.npmjs.com/package/@sebastienrousseau/password-generator)
[![Release Notes](https://img.shields.io/badge/release-notes-success.svg)](https://github.com/sebastienrousseau/password-generator/releases/)
[![npm](https://img.shields.io/npm/dm/password-generator.svg?style=flat)](https://www.npmjs.com/package/@sebastienrousseau/password-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-success.svg?style=flat)](https://opensource.org/licenses/MIT)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fsebastienrousseau%2Fpassword-generator.svg?type=small)](https://app.fossa.com/projects/git%2Bgithub.com%2Fsebastienrousseau%2Fpassword-generator?ref=badge_small)

## Features

-   **Base64 Passwords**: Generate passwords with base64 encoding for a balance of security and usability.
-   **Memorable Passwords**: Create passwords using a combination of memorable words, making them easier to remember while maintaining security.
-   **Strong Passwords**: Produce highly secure passwords with customizable length and complexity to meet the highest security standards.
-   **Customizable Options**: Specify password length, complexity, and word separators to tailor your password to your security needs.
-   **CLI Support**: Use the Password Generator directly from your terminal for quick and easy access.
-   **Secure**: Built with security as a priority, using cryptographic functions to ensure password strength.

## Installation

### From GitHub

Clone the forked repository to get all source files including build scripts:

```shell
gh repo clone augchan42/password-generator
```

Then, navigate into the cloned directory and install the dependencies using `pnpm`:

```shell
cd password-generator
pnpm i
```

Forked from @sebastienrousseau/password-generator

## Usage

To run the Password Generator, use the following command:

```shell
pnpm start
```

This will generate a password using the default configuration:
- Type: base64
- Length: 12 characters
- Iterations: 1
- Separator: "-"

### Command Line Options

You can customize the password generation using these options:

```
pnpm start -- <type> -l <length> -i <iteration> -s <separator>
```

| Option | Description | Default |
|--------|-------------|---------|
| `<type>` | Password type (random, memorable, strong) | base64 |
| `-l, --length` | Password length | 12 |
| `-i, --iteration` | Number of passwords to generate | 1 |
| `-s, --separator` | Word separator for memorable passwords | - |

### Examples

Generate a strong password of 16 characters:

```
pnpm start -- strong -l 16
```


## What's included

Within the download you'll find all the password generator source files grouped into the _dist_ folder.

You'll see something like this:

```shell
.
├── COPYRIGHT
├── LICENSE
├── Makefile
├── README.md
├── Report.txt
├── index.js
├── package.json
└── src
    ├── dictionaries
    │   ├── adjectives.json
    │   ├── adverbs.json
    │   ├── animals.json
    │   ├── cars.json
    │   ├── cities.json
    │   ├── common.json
    │   ├── countries.json
    │   ├── dinosaurs.json
    │   ├── emoji.json
    │   ├── encouraging.json
    │   ├── ergative.json
    │   ├── fruits.json
    │   ├── gemstones.json
    │   ├── hazards.json
    │   ├── instruments.json
    │   ├── lovecraft.json
    │   ├── metals.json
    │   ├── music.json
    │   ├── nouns.json
    │   ├── prepositions.json
    │   ├── shakespeare.json
    │   ├── sports.json
    │   ├── strange.json
    │   ├── vegetables.json
    │   └── winds.json
    ├── lib
    │   ├── base64-password.js
    │   ├── memorable-password.js
    │   └── strong-password.js
    └── utils
        ├── README.md
        ├── randomConsonant.js
        ├── randomNumber.js
        ├── randomSyllable.js
        ├── randomVowel.js
        ├── toCamelCase
        │   ├── README.md
        │   └── toCamelCase.js
        ├── toCharArray
        │   ├── README.md
        │   └── toCharArray.js
        ├── toKebabCase
        │   ├── README.md
        │   └── toKebabCase.js
        ├── toSnakeCase
        │   ├── README.md
        │   └── toSnakeCase.js
        └── toTitleCase
            ├── README.md
            └── toTitleCase.js

9 directories, 50 files
```

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/sebastienrousseau/password-generator/blob/master/LICENSE) file for details

## Acknowledgements

[The Password Generator Tool](https://password-generator.pro) is beautifully crafted by these people and a bunch of awesome [contributors](https://github.com/sebastienrousseau/password-generator/graphs/contributors)

| Contributors |
|---------|
|[![Sebastien Rousseau](https://avatars0.githubusercontent.com/u/1394998?s=117)](https://sebastienrousseau.co.uk)|
|[Sebastien Rousseau](https://github.com/sebastienrousseau)|

Made with ❤ in London.
