import * as fs from 'fs';
import { join } from 'path';
export class FileUtil {
	private static rootPath = process.cwd();
	private static createFolderIfNotExists(path: string): void {
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path);
		}
	}
	public static getContent(pathFile: string): string {
		return fs.readFileSync(join(FileUtil.rootPath, pathFile), 'utf8');
	}
	public static getPath(pathFile: string = ''): string {
		return join(FileUtil.rootPath, pathFile);
	}
	public static wirteFile(pathFile: string, content: string): void {
		fs.writeFileSync(join(FileUtil.rootPath, pathFile), content);
	}

	public static readFileFromAssetsFolder(pathFile: string): string {
		return fs.readFileSync(join(FileUtil.rootPath, 'assets', pathFile), 'utf8');
	}

	public static readJsonFile(pathFile: string): any {
		return JSON.parse(fs.readFileSync(join(FileUtil.rootPath, 'assets', pathFile), 'utf8'));
	}

	public static writeJsonFile(pathFile: string, content: any): void {
		this.createFolderIfNotExists(join(FileUtil.rootPath, 'assets'));
		fs.writeFileSync(join(FileUtil.rootPath, 'assets', pathFile), JSON.stringify(content, null, 4));
	}
}
