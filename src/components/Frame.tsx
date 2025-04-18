'use client'
import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { DaimoPayButton } from '@daimo/pay';
import { optimismUSDC } from '@daimo/contract';
import { getAddress } from 'viem';
import { PROJECT_TITLE, PROJECT_DESCRIPTION, PAYMENT_ADDRESS } from '../lib/constants';

export default function Frame() {
  const [memes, setMemes] = useState<string[]>([]); // This would be replaced with actual Supabase integration
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert('File too large! Maximum size is 5MB');
        return;
      }
      // Here you would implement the actual file upload to your backend
      // and Farcaster frame creation
      alert('🎉 Meme uploaded! It will appear in the Farcaster feed soon!');
      setMemes(prevMemes => [URL.createObjectURL(file), ...prevMemes]);
    }
  }, []); // Empty dependency array since we don't use any external values

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-b from-purple-50 to-pink-50 min-h-screen animate-gradient">
      <h1 className="text-4xl font-bold text-purple-600 mb-2">{PROJECT_TITLE}</h1>
      <p className="text-xl text-purple-500 mb-8">{PROJECT_DESCRIPTION}</p>

      {!paymentComplete ? (
        <div className="bg-white p-6 rounded-xl shadow-lg border-4 border-dashed border-purple-300 transform hover:rotate-1 transition-transform">
          <h2 className="text-2xl font-bold mb-4 text-center animate-bounce">🎟️ Magic Ticket</h2>
          <p className="mb-4 text-purple-600 text-center">Drop 1 USDC to unleash your meme magic! ✨</p>
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
            <h2 className="text-2xl font-bold mb-4 text-center">🎪 Show Time! Upload Your Meme!</h2>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="meme-upload"
              onChange={handleFileChange}
            />
            <label 
              htmlFor="meme-upload"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 font-bold cursor-pointer flex items-center justify-center gap-2"
            >
              🎨 Choose Your Masterpiece
              <span className="text-sm">(Max 5MB)</span>
            </label>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">🎭 Current Entries</h3>
            <div className="grid grid-cols-2 gap-4">
              {memes.length === 0 ? (
                <p className="text-gray-500 col-span-2 text-center">No memes yet - be the first!</p>
              ) : (
                memes.map((meme, i) => (
                  <div key={i} className="bg-white p-2 rounded-lg shadow">
                    <Image 
                      src={meme}
                      alt={`Meme ${i + 1}`}
                      width={300}
                      height={300}
                      className="rounded-lg"
                      style={{objectFit: 'cover'}}
                    />
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
