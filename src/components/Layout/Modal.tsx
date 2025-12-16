import { useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  enemyId: string;
  enemyVariant: string;
  enemyName: string;
  initialKills: number;
  initialDeaths: number;
  initialHits: number;
  initialEncounters: number;
  onSave: (data: { kills: number; deaths: number; hits: number; encounters: number }) => void;
  readOnly?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  enemyName,
  initialKills,
  initialDeaths,
  initialHits,
  initialEncounters,
  readOnly = false,
}: ModalProps) => {
  const [kills] = useState(initialKills);
  const [deaths] = useState(initialDeaths);
  const [hits] = useState(initialHits);
  const [encounters] = useState(initialEncounters);

  useEffect(() => {
    // Update values when props change (only for display)
  }, [initialKills, initialDeaths, initialHits, initialEncounters]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="z-50 m-0 sticky top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-3xl shadow-lg bg-[#555] border max-w-md w-full">
        <div className="flex flex-col">
          <div className="flex flex-row flex-1 gap-4 items-center justify-center">
            <h2 className="text-2xl font-bold mb-4 font-upheaval text-white">{enemyName}</h2>
          </div>
          <p className="mb-2 text-white">
            Kills:{' '}
            <span className="font-bold text-green-400">{kills}</span>
          </p>
          <p className="mb-2 text-white">
            Deaths:{' '}
            <span className="font-bold text-red-400">{deaths}</span>
          </p>
          <p className="mb-2 text-white">
            Hits:{' '}
            <span className="font-bold text-yellow-400">{hits}</span>
          </p>
          <p className="mb-4 text-white">
            Encounters:{' '}
            <span className="font-bold text-blue-400">{encounters}</span>
          </p>
          {readOnly && (
            <p className="text-sm text-gray-400 mb-4 italic">Read-only mode</p>
          )}
          <div className="flex flex-row justify-center items-center">
            <button
              onClick={onClose}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};