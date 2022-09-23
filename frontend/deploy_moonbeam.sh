#!/bin/bash

# build
NODE_ENV=production yarn build

# copy dist to mainnet S3
aws s3 sync ./build/ s3://moonfarm.voltswap/ --delete --acl public-read

# invalidate mainnet cloudfront cache
aws cloudfront create-invalidation --distribution-id E3FH7I2CZYRK33 --paths "/*"

