import * as vscode from 'vscode';

// Armazena timers para cada documento
const timers = new Map<string, NodeJS.Timeout>();

export function activate(context: vscode.ExtensionContext) {
    // Obtém o intervalo de tempo configurado pelo usuário
    const config = vscode.workspace.getConfiguration('autoSaveExtension');
    let saveInterval = config.get<number>('saveInterval', 5000); // Valor padrão de 5 segundos

    // Função para salvar o documento
    const saveDocument = (doc: vscode.TextDocument) => {
        if (doc.isDirty) {
            doc.save();
        }
    };

    // Salva o arquivo quando a aba é alterada
    const onTabChange = vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor?.document.isDirty) {
            saveDocument(editor.document);
        }
    });

    // Configura o timer após edições
    const onTextChange = vscode.workspace.onDidChangeTextDocument(e => {
        const doc = e.document;
        const key = doc.uri.toString();

        // Cancela o timer existente
        if (timers.has(key)) {
            clearTimeout(timers.get(key));
        }

        // Configura um novo timer para salvar após o período de inatividade
        timers.set(key, setTimeout(() => {
            saveDocument(doc);
            timers.delete(key);
        }, saveInterval));
    });

    // Atualiza o intervalo de tempo quando a configuração é alterada
    const onConfigChange = vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('autoSaveExtension.saveInterval')) {
            const newInterval = vscode.workspace.getConfiguration('autoSaveExtension').get<number>('saveInterval', 5000);
            // Atualiza o intervalo para novos timers
            saveInterval = newInterval; 
        }
    });

    context.subscriptions.push(onTabChange, onTextChange, onConfigChange);
}

export function deactivate() {
    // Limpa todos os timers ao desativar
    timers.forEach(timer => clearTimeout(timer));
    timers.clear();
}