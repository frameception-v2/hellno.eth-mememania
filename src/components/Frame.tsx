'use client'
import React, { useState } from 'react';
import { DaimoPayButton } from '@daimo/pay';
import { optimismUSDC } from '@daimo/contract';
import { getAddress } from 'viem';
import { PROJECT_TITLE, PROJECT_DESCRIPTION, PAYMENT_ADDRESS } from '../lib/constants';

export default function Frame() {
  const [memes, setMemes] = useState<string[]>([]); // This would be replaced with actual Supabase integration
  const [paymentComplete, setPaymentComplete] = useState(false);

  return (
    <div className="flex flex-col items-center p-4 bg-purple-50 min-h-screen">
      <h1 className="text-4xl font-bold text-purple-600 mb-2">{PROJECT_TITLE}</h1>
      <p className="text-xl text-purple-500 mb-8">{PROJECT_DESCRIPTION}</p>

      {!paymentComplete ? (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">🎟️ Entry Ticket</h2>
          <p className="mb-4 text-gray-600">Pay 1 USDC to join the fun!</p>
          <DaimoPayButton
            appId="pay-demo"
            toChain={optimismUSDC.chainId}
            toUnits="1.00"
            toToken={getAddress(optimismUSDC.token)}
            toAddress={PAYMENT_ADDRESS}
            intent="Join Meme Contest"
            onPaymentCompleted={() => setPaymentComplete(true)}
          />
        </div>
      ) : (
        <div className="w-full max-w-md">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">🎉 Upload Your Meme!</h2>
            <button 
              className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition"
              onClick={() => alert('Supabase upload integration coming soon!')}
            >
              Choose File
            </button>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">🎭 Current Entries</h3>
            <div className="grid grid-cols-2 gap-4">
              {memes.length === 0 ? (
                <p className="text-gray-500 col-span-2 text-center">No memes yet - be the first!</p>
              ) : (
                memes.map((meme, i) => (
                  <div key={i} className="bg-white p-2 rounded-lg shadow">
                    {/* Meme display would go here */}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
