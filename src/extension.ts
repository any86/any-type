// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { window, commands, env, Range, type ExtensionContext } from 'vscode';
import getType from './getType';

export function activate(context: ExtensionContext) {
	context.subscriptions.push(commands.registerCommand('extension.genTsType', async () => {
		try {
			const input = await window.showInputBox({ title: '⚡请输入JSON数据' });
			if (input) {
				const output = getType(input)
				insertText(output);
				await env.clipboard.writeText(output);
				window.showInformationMessage('类型生成成功, 已复制到剪贴板.')
			}
		} catch (error) {
			window.showErrorMessage(error as string);
		}
	}));
}


/**
 * 插入文字到编辑器
 * @param text 文字
 */
function insertText(text: string) {
	const editor = window.activeTextEditor;
	if (editor) {
		const { selections } = editor;
		editor.edit(editBuilder => {
			selections.forEach(selection => {
				const { start, end } = selection;
				const range = new Range(start, end);
				editBuilder.replace(range, text);
			});
		});
	}
}

export function deactivate() { }
