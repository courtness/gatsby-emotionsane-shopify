# Gatsby Sanity Shopify [GSS]

[<img src="//avatars1.githubusercontent.com/u/12551863?s=200&v=4" width="96" height="96">](//avatars1.githubusercontent.com/u/12551863?s=200&v=4)
[<img src="//avatars1.githubusercontent.com/u/17177659?s=200&v=4" width="96" height="96">](//avatars1.githubusercontent.com/u/17177659?s=200&v=4)
[<img src="//avatars1.githubusercontent.com/u/8085?s=200&v=4" width="96" height="96">](//avatars1.githubusercontent.com/u/8085?s=200&v=4)

A monorepo with skeleton themes and schemas built with:

- GatsbyJS (front)
- Sanity (back)
- Shopify (ecommerce)

# Installation

- Clone the repository.
- Create a new private app in Shopify, noting the API key, password and storefront token.
- Run the installation script to download dependencies and create the Sanity project:

```sh
$ yarn inst-all
```

- Note the newly created Sanity ID, and run the configuration script to define the env vars:

```sh
$ yarn configure
```

## License

MIT
