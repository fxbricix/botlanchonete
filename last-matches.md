# Especificação: Last Matches

## Objetivo
Adicionar uma nova consulta ao serviço para buscar as últimas partidas e exibir resultados em modal na interface.

## Requisitos de API

- Nova chamada assíncrona paralela às demais chamadas existentes.
- O host da chamada deve ser configurado em variável de ambiente no `.env`.
- Endpoint: `GET /last-matches?quantidade=5`
- A quantidade pode ser fixa em `5`.

## Formato de resposta esperado

A API retorna um objeto onde cada chave representa um `matchid` e cada valor contém um array `records` com até 10 objetos:

```json
{
  "2": {
    "records": [
      {
        "assists": "6",
        "damage": "2215",
        "deaths": "17",
        "enemies_flashed": "3",
        "head_shot_kills": "15",
        "kills": "20",
        "matchid": "2",
        "name": "drosin",
        "steamid64": "76561198138790534",
        "team": "team_drosin",
        "utility_damage": "309"
      },
      ...
    ]
  },
  ...
}
```

- Cada chave principal representa uma partida.
- Cada partida pode conter até 10 registros (`records`).
- Se a consulta solicitar 5 partidas, o retorno deve trazer os 5 últimos itens.

## Tratamento de erro

- Se a consulta falhar, não deve ser exibido nada na tela.
- O componente deve se comportar como se nem existisse.

## Comportamento da interface

### Exibição inicial

- Quando a consulta retornar com sucesso, exibir uma lista de partidas em formato compacto.
- Cada item da lista deve apresentar: `TIME X TIME` e um botão `ABRIR MODAL`.
- Deve ser exibido um item para cada partida retornada pela consulta, ou seja, 5 itens no caso da quantidade fixa.

### Exibição em modal

- Ao abrir um item, exibir um modal com os dados da partida.
- Somente um modal pode ficar aberto por vez.
- O modal deve ser fechável.

### Conteúdo do modal

- Os resultados devem ser organizados por time.
- Para cada time mostrar o nome do time centralizado.
- Cada linha representa um jogador com os valores de estatísticas visíveis.
- O `steamid64` não deve ser exibido.

#### Exemplo de estrutura

- `NOME DO TIME` (centralizado)
  - `Jogador 1` - estatística 1 - estatística 2 - ...
  - `Jogador 2` - estatística 1 - estatística 2 - ...
- `OUTRO TIME` (centralizado)
  - `Jogador 3` - estatística 1 - estatística 2 - ...

### Dados exibidos por jogador

Cada linha de jogador deve mostrar, no mínimo, os campos:

- `name`
- `assists`
- `damage`
- `deaths`
- `enemies_flashed`
- `head_shot_kills`
- `kills`
- `utility_damage`

## Requisitos adicionais

- A listagem dos cards existentes deve permanecer acima ou antes da seção de `last matches`.
- A nova exibição deve ficar centralizada na página.
- O modal deve funcionar corretamente em dispositivos responsivos.
