# Gatsby Sanity Shopify [GSS]

[<img src="https://avatars1.githubusercontent.com/u/12551863?s=200&v=4" width="96" height="96">](https://avatars1.githubusercontent.com/u/12551863?s=200&v=4)
[<img src="https://avatars1.githubusercontent.com/u/17177659?s=200&v=4" width="96" height="96">](https://avatars1.githubusercontent.com/u/17177659?s=200&v=4)
[<img src="https://avatars1.githubusercontent.com/u/8085?s=200&v=4" width="96" height="96">](https://avatars1.githubusercontent.com/u/8085?s=200&v=4)

A monorepo with skeleton themes and schemas built with:

- GatsbyJS (front)
- Sanity (back)
- Shopify (ecommerce)

# Installation

- Create a new repository using this as a template, and clone it.
- Create a new private app in Shopify, noting the API key, password and storefront token.
- Run the installation script to download dependencies, create the Sanity project, and run environment variable capture:

```sh
$ yarn prep
```

- (Optional) Run the prefill tool to download products from Shopify and upload them to Sanity:

```sh
$ yarn prefill
```

- Start developing in the gatsby/ folder

```sh
$ cd gatsby
$ yarn dev
```

## License

MIT
