const hre = require('hardhat')
const fs = require('fs')

async function main() {
  const NFT = await hre.ethers.getContractFactory('NFT')
  const nft = await NFT.deploy()

  await nft.deployed()

  console.log('NFT deployed to:', nft.address)

  fs.writeFileSync(
    './../../nft-frontend/src/utils/contractAddress.js',
    `export const nftAddress = "${nft.address}"`
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
