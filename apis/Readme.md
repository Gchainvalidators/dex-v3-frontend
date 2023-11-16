# Deploy API
// install wrangler
npm install -g wrangler

// Login
wrangler login

// Create Namespace 
wrangler kv:namespace create MIXPOOLS

// Create Preview
wrangler kv:namespace create MIXPOOLS --preview
=> Update key to wrangler.toml

// Create Bucket
wrangler r2 bucket create MIX_SUBGRAPH_POOLS


echo https://rpc.genesys.network | wrangler secret put GSYS_NODE 
echo https://eth.llamarpc.com | wrangler secret put ETH_NODE 
echo https://eth-goerli.public.blastapi.io | wrangler secret put GOERLI_NODE 
echo https://bsc-dataseed.binance.org | wrangler secret put BSC_NODE 
echo https://data-seed-prebsc-2-s1.binance.org:8545 | wrangler secret put BSC_TESTNET_NODE 
echo https://f2562de09abc5efbd21eefa083ff5326.zkevm-rpc.com | wrangler secret put POLYGON_ZKEVM_NODE 
echo https://mainnet.era.zksync.io | wrangler secret put ZKSYNC_NODE 

=
