import * as FileSource from "fs";
import * as Path from "path";
import * as System from "os";

/** Constains all application utilities */
export class Utils {

    /** Number of availeable thereads */
    public avaliableCPUs: number = System.cpus().length;

    /** Read all files recursivly form directory */
    public static getFilesPaths(directoryPath: string, subDirectory?: string): string[] {
        const resolvedPath: string = Path.resolve(__dirname, directoryPath, !subDirectory ? "" : subDirectory);
        let paths: string[] = new Array<string>();
        if (FileSource.statSync(resolvedPath).isDirectory()) {
            const list: string[] = FileSource.readdirSync(resolvedPath);
            for (const fileName of list) {
                paths = paths.concat(this.getFilesPaths(resolvedPath, fileName));
            }
        } else {
            paths.push(resolvedPath);
        }

        return paths;
    }

    /** Returns the folder name of the file */
    public static getCatalogName(fileName: string): string {
        if (FileSource.statSync(fileName).isFile()) {
            const directoryArray: string[] = Path.dirname(fileName).split("\\");
            return directoryArray[directoryArray.length - 1];
        }
        return "";
    }
}
