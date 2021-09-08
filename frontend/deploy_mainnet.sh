#!/bin/bash

# build
NODE_ENV=production yarn build

# copy dist to mainnet S3
aws s3 sync ./build/ s3://voltswap-farm-main/ --delete --acl public-read

# invalidate mainnet cloudfront cache
aws cloudfront create-invalidation --distribution-id E206N8M1OFV7ZA --paths "/*"

