import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
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
                } else {
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

export function deactivate() {}
