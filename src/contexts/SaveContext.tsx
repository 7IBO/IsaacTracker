import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Save } from '../Models/Save';
import { FileSystemService } from '../services/FileSystemService';

interface SaveContextType {
  save: Save | null;
  setSave: (save: Save | null) => void;
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  loadSaveFile: () => Promise<void>;
  loadSaveFromFile: (file: File) => Promise<void>;
  fileSystemService: FileSystemService;
  useFallback: boolean;
}

const SaveContext = createContext<SaveContextType | undefined>(undefined);

export const SaveProvider = ({ children }: { children: ReactNode }) => {
  const [save, setSave] = useState<Save | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileSystemService] = useState(() => new FileSystemService());
  const [useFallback, setUseFallback] = useState(!FileSystemService.isFileSystemAccessSupported());

  const loadSaveFile = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Si pas d'accès au dossier, le demander
      if (!fileSystemService.hasDirectoryAccess()) {
        await fileSystemService.requestDirectoryAccess();
      }

      // Lire le fichier le plus récent
      const result = await fileSystemService.readMostRecentSave();

      if (!result) {
        setError('No save file found in the selected directory');
        setIsLoading(false);
        return;
      }

      // Charger la sauvegarde
      const newSave = new Save();
      await newSave.update(result.data);
      newSave.set_filename(result.filename);

      setSave(newSave);
      setIsLoaded(true);
      setIsLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';

      // Si l'API n'est pas supportée, passer en mode fallback
      if (errorMessage === 'UNSUPPORTED_API') {
        setUseFallback(true);
        setError('File System Access API is not supported. Please use the file picker instead.');
      } else {
        setError(errorMessage);
      }

      setIsLoading(false);
      console.error('Error loading save file:', err);
    }
  };

  const loadSaveFromFile = async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);

      const arrayBuffer = await file.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);

      const newSave = new Save();
      await newSave.update(data);
      newSave.set_filename(file.name);

      setSave(newSave);
      setIsLoaded(true);
      setIsLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setIsLoading(false);
      console.error('Error loading save file:', err);
    }
  };

  // Auto-refresh toutes les 5 secondes
  useEffect(() => {
    if (!isLoaded || !fileSystemService.hasDirectoryAccess()) {
      return;
    }

    const interval = setInterval(async () => {
      try {
        const result = await fileSystemService.readMostRecentSave();
        if (result && save) {
          // Comparer le nom du fichier pour voir s'il a changé
          if (result.filename !== save.get_filename()) {
            const newSave = new Save();
            await newSave.update(result.data);
            newSave.set_filename(result.filename);
            setSave(newSave);
          }
        }
      } catch (err) {
        console.error('Error refreshing save file:', err);
      }
    }, 5000); // Refresh toutes les 5 secondes

    return () => clearInterval(interval);
  }, [isLoaded, save, fileSystemService]);

  return (
    <SaveContext.Provider
      value={{
        save,
        setSave,
        isLoaded,
        setIsLoaded,
        isLoading,
        setIsLoading,
        error,
        setError,
        loadSaveFile,
        loadSaveFromFile,
        fileSystemService,
        useFallback,
      }}
    >
      {children}
    </SaveContext.Provider>
  );
};

export const useSave = () => {
  const context = useContext(SaveContext);
  if (context === undefined) {
    throw new Error('useSave must be used within a SaveProvider');
  }
  return context;
};