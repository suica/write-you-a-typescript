# write-you-a-typescript

## How to run this project

### To serve the slides locally

1. Install dependencies

```bash
yarn && cd slides && yarn
```

2. Run slides server

You can choose to run the slides server locally (cannot be accessed by other), or in remote mode. Under remote mode, remote control will be enabled and slides server is exposed to other computers under the same network.

- To run slides in local mode, you need to run
```bash
yarn slides
```

- To run slides in remote mode, you need to run

```bash
cd slides && yarn remote
```