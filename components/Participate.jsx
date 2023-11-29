import React from 'react';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';

const Participate = () => {
    // this is to prepare the contract write, according to wagmi docs
    const { config } = usePrepareContractWrite({
        address: '0x5393e49411470416bFeBb86d7CA6fD7C1add4390',
        abi: [
            {
                name: 'participate',
                type: 'function',
                stateMutability: 'nonpayable',
                inputs: [],
                outputs: [],
            },
        ],
        functionName: 'participate',
    });

    // according to the wagmi docs, this is the function that will be called when the button is clicked
    const { write } = useContractWrite(config);

    // this is to handle the participate function
    const handleParticipate = () => {
        try {
            write?.();
            // The write function executed successfully
            alert('Successful!');
            console.log('Successful!');
        } catch (error) {
            // Handle errors if the write function fails
            console.error('Error in participating:', error);
            alert('Error.');
        }
    };

    return (
        <div className='pl-5 pt-1 text-lg'>
        {/* here the participate function will be called */}
            <button disabled={!write} onClick={handleParticipate} className='cursor-pointer bg-red-500 font-semibold px-2 rounded-sm'>
                Participate
            </button>
        </div>
    );
}

export default Participate