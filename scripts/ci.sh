#!/bin/bash -ex

NODE_INDEX="$1"
TOTAL_NODES="$2"

function checkEOL {
  ./scripts/checkeol.sh
}

typecheck() {
  npm install -g flow-bin
  flow --version
  npm run typecheck
}

lint() {
  echo "eslint $(node_modules/.bin/eslint --version)"
  npm list babel-eslint | grep babel-eslint
  REPO_URL="https://raw.githubusercontent.com/ripple/javascript-style-guide"
  curl "$REPO_URL/es6/eslintrc" > ./eslintrc
  echo "parser: babel-eslint" >> ./eslintrc
  node_modules/.bin/eslint -c ./eslintrc $(git --no-pager diff --name-only -M100% --diff-filter=AM --relative $(git merge-base FETCH_HEAD origin/HEAD) FETCH_HEAD | grep "\.js$")
}

unittest() {
  # test "src"
  npm test --coverage
  npm run coveralls

  # test compiled version in "dist/npm"
  babel -D --optional runtime --ignore "**/node_modules/**" -d test-compiled/ test/
  echo "--reporter spec --timeout 5000 --slow 500" > test-compiled/mocha.opts
  mkdir -p test-compiled/node_modules
  ln -nfs ../../dist/npm test-compiled/node_modules/ripple-api
  mocha --opts test-compiled/mocha.opts test-compiled
  rm -rf test-compiled
}

integrationtest() {
  mocha test/integration/integration-test.js
  mocha test/integration/http-integration-test.js
}

doctest() {
  mv docs/index.md docs/index.md.save
  npm run docgen
  mv docs/index.md docs/index.md.test
  mv docs/index.md.save docs/index.md
  cmp docs/index.md docs/index.md.test
  rm docs/index.md.test
}

oneNode() {
  checkEOL
  doctest
  lint
  typecheck
  unittest
  integrationtest
}

twoNodes() {
  case "$NODE_INDEX" in
    0) doctest; lint; integrationtest;;
    1) checkEOL; typecheck; unittest;;
    *) echo "ERROR: invalid usage"; exit 2;;
  esac
}

threeNodes() {
  case "$NODE_INDEX" in
    0) doctest; lint; integrationtest;;
    1) checkEOL; typecheck;;
    2) unittest;;
    *) echo "ERROR: invalid usage"; exit 2;;
  esac
}

case "$TOTAL_NODES" in
  "") oneNode;;
  1) oneNode;;
  2) twoNodes;;
  3) threeNodes;;
  *) echo "ERROR: invalid usage"; exit 2;;
esac
