# How To Run

## 1. Setup Test Env

```
npx w3 test-env up
```

## 2. Build & Deploy The Web3API

```
npx w3 build \
--ipfs http://localhost:5001 \
--graph ipfs,http://localhost:8020 \
--test-ens ipfs.eth
```

## 3. Test The Web3API Using A Query Recipe

```
npx w3 query ./recipes/e2e.json --test-ens
```