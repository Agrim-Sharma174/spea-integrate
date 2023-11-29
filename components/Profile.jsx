import React, { useState, useEffect } from 'react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
} from 'wagmi';

export function Profile() {
    const { address, connector, isConnected } = useAccount();
    const { data: ensName } = useEnsName({ address });
    const { data: ensAvatar } = useEnsAvatar({ name: ensName });
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
    const { disconnect } = useDisconnect();


    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { config } = usePrepareContractWrite({
        address: '0x5393e49411470416bFeBb86d7CA6fD7C1add4390',
        abi: [
            {
                name: 'claimReward',
                type: 'function',
                stateMutability: 'nonpayable',
                inputs: [],
                outputs: [],
            },
        ],
        functionName: 'claimReward',
    });

    // according to the wagmi docs, this is the function that will be called when the button is clicked
    const { write } = useContractWrite(config);

    // const handleClaimReward = () => {
    //     try {
    //         write?.();
    //         // The write function executed successfully
    //         alert('Successfully claimed your reward!');
    //         console.log('Successfully claimed your reward!');
    //     } catch (error) {
    //         // Handle errors if the write function fails
    //         console.error('Error claiming reward:', error);
    //         alert('Error claiming your reward. Please try again.');
    //     }
    // };
    const handleClaimReward = async () => {
        try {
          console.log('Preparing to claim reward...');
          const transactionHash = await write?.(); // Await the transaction
    console.log('Successfully claimed your reward!', transactionHash);
          console.log('Successfully claimed your reward!');
          alert('Successfully claimed your reward!');
        } catch (error) {
          console.error('Error claiming reward:', error);
          alert('Error claiming your reward. Please try again.');
        }
    };

    return (
        <div className='pl-5 pt-5 text-lg'>
            {isConnected && isClient ? (
                <div>
                    <div className='px-2'>Connected! 🎉</div>
                    <button onClick={disconnect} className='bg-gray-400 px-2 rounded-sm'>Disconnect</button>
                </div>
            ) : (
                <div>
                    {connectors.map((connector) => (
                        <button
                            // disabled={!connector.ready}
                            key={connector.id}
                            onClick={() => connect({ connector })}
                        >
                            <div className='mr-4 bg-gray-400 px-2 cursor-pointer'>{connector.name}</div>
                            {/* {!connector.ready && ' (unsupported)'}
                            {isLoading &&
                                connector.id === pendingConnector?.id &&
                                ' (connecting)'} */}
                        </button>
                    ))}
                    {error && <div>{error.message}</div>}
                </div>
            )}

            <button onClick={handleClaimReward} className='cursor-pointer bg-red-500 font-semibold mt-10 px-2 rounded-sm'>
                claim reward
            </button>
        </div>
    );
}
