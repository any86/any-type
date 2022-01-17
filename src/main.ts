// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import vscode  from 'vscode';
import getType from './getType';


export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('extension.genTsType', async() => {
		const input  = await vscode.window.showInputBox({title: '请输入JSON数据'});
		if(input){
			const output = getType(input)
			await vscode.env.clipboard.writeText(output);
			vscode.window.showInformationMessage('类型生成完毕, 已复制到剪贴板')
			// console.log(output)
		}

	}));
}

export function deactivate() { }
