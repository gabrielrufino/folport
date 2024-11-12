/**
 * Options for customizing the behavior of folport.
 */
interface FolportOptions {
  /**
   * A function that takes a filename and returns a label for the module.
   * Defaults to a function that converts filenames to camelCase.
   */
  labeler?: (filename: string) => string;
}

/**
 * Imports all modules from a folder.
 * @param folder - Path to the folder containing modules.
 * @param options - Optional settings, including a custom labeler function.
 * @returns A Promise resolving to an object with all imported modules.
 */
declare function folport(folder: string, options?: FolportOptions): Promise<Record<string, any>>;

export default folport;
  