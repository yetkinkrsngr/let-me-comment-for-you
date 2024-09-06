"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    // Yeni bir komut kaydediyoruz
    let disposable = vscode.commands.registerCommand('extension.addComment', () => {
        // Şu anki açık editörü alıyoruz
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            // Seçili olan metin ya da mevcut imleç pozisyonunu alıyoruz
            const selectedText = document.getText(selection);
            // Yorum metni
            const commentText = '// Let me comment for you';
            editor.edit(editBuilder => {
                if (selectedText) {
                    // Eğer metin seçiliyse, seçilen metnin üzerine yorum ekliyoruz
                    editBuilder.replace(selection, `${commentText} ${selectedText}`);
                }
                else {
                    // Eğer metin seçili değilse, imlecin olduğu satıra yorum ekliyoruz
                    const position = selection.active;
                    editBuilder.insert(position, `${commentText}\n`);
                }
            });
        }
    });
    // Komutu kayıt ediyoruz
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map