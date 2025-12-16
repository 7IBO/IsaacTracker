/**
 * Service pour lire automatiquement le fichier de sauvegarde Isaac
 * Utilise l'API File System Access pour accéder au dossier local
 */

export class FileSystemService {
  private directoryHandle: FileSystemDirectoryHandle | null = null;
  private readonly SAVE_PATTERN = /\.rep_persistentgamedata1\.dat$/;

  /**
   * Vérifie si l'API File System Access est disponible
   */
  static isFileSystemAccessSupported(): boolean {
    return 'showDirectoryPicker' in window;
  }

  /**
   * Demande l'accès au dossier de sauvegarde
   */
  async requestDirectoryAccess(): Promise<void> {
    if (!FileSystemService.isFileSystemAccessSupported()) {
      throw new Error('UNSUPPORTED_API');
    }

    try {
      // @ts-ignore - showDirectoryPicker est disponible dans les navigateurs modernes
      this.directoryHandle = await window.showDirectoryPicker({
        mode: 'read',
        startIn: 'documents',
      });
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        throw new Error('User cancelled directory selection');
      }
      throw new Error('Failed to access directory: ' + (error as Error).message);
    }
  }

  /**
   * Trouve le fichier .dat le plus récent dans le dossier
   */
  async findMostRecentSaveFile(): Promise<File | null> {
    if (!this.directoryHandle) {
      throw new Error('Directory access not granted. Call requestDirectoryAccess() first.');
    }

    let mostRecentFile: File | null = null;
    let mostRecentTime = 0;

    try {
      // @ts-ignore - values() est disponible
      for await (const entry of this.directoryHandle.values()) {
        if (entry.kind === 'file' && this.SAVE_PATTERN.test(entry.name)) {
          const fileHandle = entry as FileSystemFileHandle;
          const file = await fileHandle.getFile();

          if (file.lastModified > mostRecentTime) {
            mostRecentTime = file.lastModified;
            mostRecentFile = file;
          }
        }
      }
    } catch (error) {
      throw new Error('Failed to read directory: ' + (error as Error).message);
    }

    return mostRecentFile;
  }

  /**
   * Lit le fichier de sauvegarde le plus récent
   */
  async readMostRecentSave(): Promise<{ data: Uint8Array; filename: string } | null> {
    const file = await this.findMostRecentSaveFile();

    if (!file) {
      return null;
    }

    const arrayBuffer = await file.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);

    return {
      data,
      filename: file.name,
    };
  }

  /**
   * Vérifie si l'accès au dossier a été accordé
   */
  hasDirectoryAccess(): boolean {
    return this.directoryHandle !== null;
  }

  /**
   * Réinitialise l'accès au dossier
   */
  resetDirectoryAccess(): void {
    this.directoryHandle = null;
  }
}