# Documentação para Executar o Dev Container

## Requisitos

Antes de iniciar, certifique-se de que os seguintes pré-requisitos estão atendidos:

- **Docker** instalado e em execução.
- **Dev Container CLI** instalado (opcional para execução via CLI).
- **Visual Studio Code** instalado com a extensão **Remote - Containers** (ou **Dev Containers**) habilitada.

---

## Executando com o Dev Container CLI

1. **Instale o Dev Container CLI (caso não esteja instalado):**
   - Siga as instruções no [repositório oficial do Dev Container CLI](https://github.com/devcontainers/cli#installation).

2. **Navegue até o diretório que contém o arquivo `devcontainer.json`:**
   ```bash
   cd /path/to/.devcontainer/
   ```

3. **Inicie o Dev Container:**
   Execute o seguinte comando no terminal:
   ```bash
   devcontainer up --workspace-folder ..
   ```

4. **Acesse o container:**
   Para abrir um terminal dentro do container, use:
   ```bash
   devcontainer exec --workspace-folder ..
   ```

5. **Encerrar o container:**
   Quando terminar, finalize o container com:
   ```bash
   devcontainer down --workspace-folder ..
   ```

---

## Executando com o Visual Studio Code

1. **Abra o Visual Studio Code:**

   - Certifique-se de que a extensão **Dev Containers** está instalada. Se não estiver, instale-a pelo **Marketplace de Extensões**.

2. **Abra o Workspace:**
   - Navegue até a pasta raiz do projeto (um nível acima do diretório `.devcontainer`) e abra-a no VS Code:
     ```bash
     code .
     ```

3. **Abra no Dev Container:**
   - Pressione `F1` ou `Ctrl + Shift + P` para abrir a **Command Palette**.
   - Digite e selecione `Dev Containers: Reopen in Container`.

4. **Espere a configuração concluir:**
   - O Visual Studio Code irá construir a imagem definida no `dockerfile` e montar o container.

5. **Desenvolva no container:**
   - O container estará pronto para ser usado com as extensões configuradas (`ESLint` e `Prettier`).

6. **Parar o container:**
   - Para encerrar, feche o Visual Studio Code ou vá até o menu **Remote - Containers** e escolha a opção de parar o container.

---

## Configurações e Portas

### Personalizações VS Code:
- Nome do container: `auto-save-extension`.
- Extensões instaladas:
  - `ESLint` (para linting do código).
  - `Prettier` (para formatação de código).

