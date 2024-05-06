# BIX-UI

BIX-UI is a user interface component library developed for React, utilizing TypeScript. It is designed to facilitate component reuse across various projects through a simple CLI interface.

## Features

- **Component Reusability**: Simplify maintenance and design consistency across multiple projects.
- **CLI Interface**: Install components individually as needed.

## Installation

You can install BIX-UI directly via npm:

```bash
npm install bix-ui
```

## Usage

**Adding Components**
After installation, you can add components to your project using the included CLI. For example, to add the ButtonBase component, run:

```bash
npx bix-ui add ButtonBase -c ./path/to/components/folder
```

**Importing and Using Components**
After adding a component, import and use it in your React files:

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

### Working on

- Ad a unit test to the component
- Create a flag to pull the unit test too
