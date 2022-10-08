import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Box, Container } from '@chakra-ui/react'
import {
  useAccount,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'
import contractInterface from ''

const Mint = () => {
  const { isConnected } = useAccount()

  const { config } = usePrepareContractWrite({
    addressOrName: '',
    contractInterface: '',
    functionName: 'mint'
  })

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted
  } = useContractWrite(config)

  const { isSuccess: txSuccess } = useWaitForTransaction({
    hash: mintData?.hash
  })

  const isMinted = txSuccess

  return (
    <Container>
      <Box>
        <Box>
          <ConnectButton />
          {isConnected && (
            <Button
              onClick={() => mint?.()}
              disabled={isMintLoading || isMintStarted}
              data-mint-loading={isMintLoading}
              data-mint-started={isMintStarted}
            >
              {isMintLoading && (
                <Button
                  isLoading
                  colorScheme='blue'
                  spinner={<BeatLoader size={8} color='white' />}
                >
                  Waiting on confirmation
                </Button>
              )}
              {isMintStarted && (
                <Stack direction='row' spacing={4}>
                  <Button isLoading colorScheme='teal' variant='solid'>
                    Minting
                  </Button>
                  <Button
                    isLoading
                    loadingText='Submitting'
                    colorScheme='teal'
                    variant='outline'
                  >
                    Submit
                  </Button>
                </Stack>
              )}
              {!isMintLoading && !isMintStarted && 'Mint'}
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  )
}

export default Mint
