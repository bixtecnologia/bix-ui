# BIX-UI

BIX-UI é uma biblioteca de componentes de interface do usuário desenvolvida para React, utilizando TypeScript. É projetada para facilitar a reutilização de componentes em diversos projetos através de uma interface CLI simples.

## Características

- **Reutilização de Componentes**: Facilite a manutenção e consistência do design em diversos projetos.
- **Interface CLI**: Instale componentes individualmente conforme a necessidade.

## Instalação

Você pode instalar o BIX-UI diretamente via npm:

```bash
npm install bix-ui
```

## Uso

**Adicionando Componentes**
Após a instalação, você pode adicionar componentes ao seu projeto usando o CLI incluído. Por exemplo, para adicionar o componente ButtonBase, execute:

```bash
npx bix-ui add ButtonBase -c ./path/to/components/folder
```

**Importação e Uso de Componentes**
Após adicionar um componente, importe e use-o em seus arquivos React:

```tsx
import ButtonBase from "./path/to/components/folder/ButtonBase";

function App() {
  return (
    <div>
      <ButtonBase />
    </div>
  );
}

export default App;
```

### TODO

- Ad a unit test to the component
- Create a flag to pull the unit test too
