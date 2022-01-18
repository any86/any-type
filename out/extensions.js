"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
var tslib_1 = require("tslib");
var vscode_1 = (0, tslib_1.__importDefault)(require("vscode"));
var getType_1 = (0, tslib_1.__importDefault)(require("./getType"));
function activate(context) {
    var _this = this;
    context.subscriptions.push(vscode_1.default.commands.registerCommand('extension.genTsType', function () { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () {
        var input, output, error_1;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4, vscode_1.default.window.showInputBox({ title: '⚡请输入JSON数据' })];
                case 1:
                    input = _a.sent();
                    if (!input) return [3, 3];
                    output = (0, getType_1.default)(input);
                    return [4, vscode_1.default.env.clipboard.writeText(output)];
                case 2:
                    _a.sent();
                    vscode_1.default.window.showInformationMessage('类型生成完毕, 已复制到剪贴板');
                    _a.label = 3;
                case 3: return [3, 5];
                case 4:
                    error_1 = _a.sent();
                    vscode_1.default.window.showErrorMessage(error_1);
                    return [3, 5];
                case 5: return [2];
            }
        });
    }); }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extensions.js.map