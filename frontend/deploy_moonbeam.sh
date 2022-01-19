#!/bin/bash

# build
NODE_ENV=production yarn build

# copy dist to mainnet S3
aws s3 sync ./build/ s3://moonfarm.voltswap.finance/ --delete --acl public-read

# invalidate mainnet cloudfront cache
aws cloudfront create-invalidation --distribution-id EAJZ7T6F7KM1R --paths "/*"

