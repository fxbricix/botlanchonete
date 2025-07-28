# Scripts de Desenvolvimento Local

## Para rodar localmente:

1. **Configurar variáveis de ambiente:**

   ```bash
   cp .env.example .env.local
   ```

   Edite o arquivo `.env.local` com suas credenciais reais.

2. **Instalar dependências:**

   ```bash
   npm install
   ```

3. **Rodar em modo desenvolvimento:**

   ```bash
   npm run dev
   ```

4. **Fazer build para produção:**

   ```bash
   npm run build
   ```

5. **Testar build localmente:**
   ```bash
   npm run preview
   ```

## Deploy no GitHub Pages:

1. **Configurar secrets no GitHub:**

   - Vá em Settings > Secrets and variables > Actions
   - Adicione os secrets necessários (veja README.md)

2. **Deploy automático:**

   - Push para a branch `main` ativa o deploy automático

3. **Deploy manual:**
   ```bash
   npm run deploy
   ```

## Estrutura do Projeto:

```
├── src/
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Entry point do React
│   └── index.css        # Estilos globais
├── public/              # Arquivos estáticos
├── .github/workflows/   # GitHub Actions
├── .env.example         # Exemplo de variáveis
├── .env.local          # Variáveis locais (não comitar)
└── vite.config.js      # Configuração do Vite
```
