import { computed } from 'vue'
import { Connection, PublicKey } from '@solana/web3.js'
import { useAnchorWallet } from 'solana-wallets-vue'
import { Program, Provider } from '@project-serum/anchor'
import idl from '@/idl/twitter.json'

const preflightCommitment = 'processed' // confirmed / finalized
const commitment = 'processed'
const clusterUrl = process.env.VUE_APP_CLUSTER_URL
const programID = new PublicKey(idl.metadata.address)
let workspace = null

export const useWorkspace = () => workspace

export const initWorkspace = () => {
    const wallet = useAnchorWallet()
    const connection = new Connection(clusterUrl, commitment)
    const provider = computed(() => new Provider(connection, wallet.value, { preflightCommitment, commitment }))
    const program = computed(() => new Program(idl, programID, provider.value))
    workspace = {
        // Provided data here...
        wallet,
        connection,
        provider,
        program,
    }
}