# hrnet-modal-component

A reusable modal React component for HRnet projects.

## Installation
```bash
npm install vatr84-modal-component
```
OR
```bash
npm i https://github.com/vatr84/vatr84-modal-component.git
```

## Usage
```jsx
import Modal from 'vatr84-modal-component';

<Modal isOpen={isOpen} onClose={closeModal} title="Title" closeText="Close">
  <p>Content</p>
</Modal>
```

## Props

| Name         | Type               | Default     | Description                                      |
|--------------|--------------------|-------------|--------------------------------------------------|
| isOpen       | boolean            | —           | Controls whether the modal is open               |
| onClose      | function           | —           | Function called when modal is closed             |
| children     | React.ReactNode    | —           | Content to display inside the modal              |
| title        | string             | "Success!"  | Title displayed at the top of the modal          |
| closeText    | string             | "Close"     | Text for the close button                        |
| maxWidth     | number             | null        | Maximum width of the modal in pixels             |
| className    | string             | ""          | Additional CSS class names for the modal content |
| fadeDuration | number             | 300         | Duration of fade animation in milliseconds       |
