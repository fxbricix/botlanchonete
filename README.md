# Lanchonete Server Tracker

Uma aplicação React que monitora o status de um servidor de jogos hospedado no DatHost, exibindo informações em tempo real em uma interface web elegante.

## 🚀 Funcionalidades

- ✅ Monitoramento em tempo real do status do servidor
- 🎮 Exibição de informações do jogo (nome, localização, status)
- 🔄 Atualização automática a cada 30 segundos (configurável)
- 📱 Interface responsiva e moderna
- 🖥️ Comando de conexão fácil de copiar
- 🟢 Indicador visual de status (online/offline)

## 🛠️ Tecnologias Utilizadas

- React 18
- Vite
- CSS3 com animações
- GitHub Pages para hospedagem
- GitHub Actions para CI/CD

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local` e preencha com suas credenciais:

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local`:

```env
VITE_DAT_HOST_EMAIL=seu_email@dathost.net
VITE_DAT_HOST_PASSWORD=sua_senha_dathost
VITE_TRACK_SERVER_ID=id_do_seu_servidor
VITE_TRACK_INTERVAL_SEC=30
VITE_SERVER_IP=lanches.dat.gg:26088
```

### 2. Instalação

```bash
npm install
```

### 3. Desenvolvimento

```bash
npm run dev
```

### 4. Build para Produção

```bash
npm run build
```

## 🌐 Deploy no GitHub Pages

### Configuração dos Secrets

No seu repositório GitHub, vá em **Settings > Secrets and variables > Actions** e adicione:

- `VITE_DAT_HOST_EMAIL`: Seu email do DatHost
- `VITE_DAT_HOST_PASSWORD`: Sua senha do DatHost
- `VITE_TRACK_SERVER_ID`: ID do servidor no DatHost
- `VITE_TRACK_INTERVAL_SEC`: Intervalo de atualização (opcional, padrão: 30)
- `VITE_SERVER_IP`: IP do servidor para conexão (ex: lanches.dat.gg:26088)

### Deploy Automático

O deploy é feito automaticamente via GitHub Actions quando você faz push para a branch `main`.

### Deploy Manual

```bash
npm run deploy
```

## 📋 Como Obter as Informações do DatHost

1. Acesse [DatHost.net](https://dathost.net)
2. Faça login na sua conta
3. Vá para o seu servidor
4. Na URL, você verá algo como: `https://dathost.net/control/game-servers/XXXXXXXX`
5. O `XXXXXXXX` é o seu `TRACK_SERVER_ID`

## ⚠️ Importante: CORS e API do DatHost

**Possível problema de CORS**: A API do DatHost pode não permitir requisições diretas do browser devido a políticas de CORS. Isso é normal e existem algumas soluções:

### Soluções para CORS:

1. **Durante desenvolvimento**: O projeto já inclui configuração de proxy no Vite que deve funcionar localmente
2. **Em produção**: Se houver erro de CORS no GitHub Pages, considere:
   - Usar uma extensão de browser que desabilita CORS (apenas para teste)
   - Implementar um backend simples que faça proxy das requisições
   - Usar um serviço de proxy como `cors-anywhere`

### Testando localmente:

```bash
npm run dev  # Usa proxy do Vite para contornar CORS
```

## 🎯 Diferenças do Bot Discord Original

- ✅ Interface web ao invés de bot Discord
- ✅ Não requer token do Discord
- ✅ Hospedagem gratuita no GitHub Pages
- ✅ Acesso via browser de qualquer dispositivo
- ✅ Design responsivo e moderno

## 📱 Acesso

Após o deploy, sua aplicação estará disponível em:
`https://seuusuario.github.io/botlanchonete`

## 🔧 Personalização

Você pode personalizar:

- Cores e estilos no arquivo `src/index.css`
- Intervalo de atualização nas variáveis de ambiente
- Layout e informações exibidas no `src/App.jsx`

## 📝 Licença

Este projeto é open source e está disponível sob a licença MIT.
