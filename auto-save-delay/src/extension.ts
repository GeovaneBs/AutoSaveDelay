import * as vscode from 'vscode';


// Armazena timers para cada documento
const timers = new Map<string, NodeJS.Timeout>();

export function activate(context: vscode.ExtensionContext) {
    // Salva o arquivo quando a aba é alterada
    const onTabChange = vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor?.document.isDirty) {
            editor.document.save();
        }
    });

    // Configura o timer de 10 segundos após edições
    const onTextChange = vscode.workspace.onDidChangeTextDocument(e => {
        const doc = e.document;
        const key = doc.uri.toString();

        // Cancela o timer existente
        if (timers.has(key)) {
            clearTimeout(timers.get(key));
        }

        // Novo timer para salvar após 10 segundos
        timers.set(key, setTimeout(() => {
            if (doc.isDirty) {
                doc.save();
            }
            timers.delete(key);
        }, 10000)); // 10 segundos
    });

    context.subscriptions.push(onTabChange, onTextChange);
}

export function deactivate() {
    // Limpa todos os timers ao desativar
    timers.forEach(timer => clearTimeout(timer));
    timers.clear();
}