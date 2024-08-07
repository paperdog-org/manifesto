# PaperDog Manifesto

An open source interface for PaperDog AI with protocol access to Bitcoin, Ethereum, and Solana. 

-- Dexes: decentralized exchanges like Uniswap, Curve, and Jupiter

-- Lending: deposit and lending providers like Aave, Compound, and Maker

-- Liquid Staking: staked custodians like Lido and Rocket Pool

- Website: [paperdog.org](https://paperdog.org/)
- X: [@PaperDogAI](https://x.com/PaperDogAI)
- Docs: Coming Soon
- Discord: Coming Soon
- Telegram: Coming soon

## Accessing PaperDog

To access PaperDog , use an IPFS gateway link from the
[latest release](https://github.com/PaperDog/PaperDog-interface/releases/latest),
or visit [app.PaperDog.org](https://app.PaperDog.org).

## Unsupported tokens

Check out `useUnsupportedTokenList()` in [src/state/lists/hooks.ts](./src/state/lists/hooks.ts) for blocking tokens in your instance of the interface.

You can block an entire list of tokens by passing in a tokenlist like [here](./src/constants/lists.ts)

## Contributions

For steps on local deployment, development, and code contribution, please see [CONTRIBUTING](./CONTRIBUTING.md).

#### PR Title
Your PR title must follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary), and should start with one of the following [types](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type):

- build: Changes that affect the build system or external dependencies (example scopes: yarn, eslint, typescript)
- ci: Changes to our CI configuration files and scripts (example scopes: vercel, github, cypress)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- test: Adding missing tests or correcting existing tests

Example commit messages:

- feat: adds support for gnosis safe wallet
- fix: removes a polling memory leak
- chore: bumps redux version

Other things to note:

- Please describe the change using verb statements (ex: Removes X from Y)
- PRs with multiple changes should use a list of verb statements
- Add any relevant unit / integration tests
- Changes will be previewable via vercel. Non-obvious changes should include instructions for how to reproduce them