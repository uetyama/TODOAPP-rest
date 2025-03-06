// src/styles/todoStyles.ts
import { CSSProperties } from 'react';

export const containerStyle: CSSProperties = {
  maxWidth: '600px',
  margin: '40px auto',
  padding: '20px',
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  borderRadius: '8px',
  fontFamily: 'Arial, sans-serif'
};

export const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#333'
};

export const formStyle: CSSProperties = {
  display: 'flex',
  marginBottom: '20px'
};

export const inputStyle: CSSProperties = {
  flex: 1,
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  marginRight: '10px'
};

export const buttonStyle: CSSProperties = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  background: '#007bff',
  color: '#fff',
  cursor: 'pointer'
};

export const todoItemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #eee'
};

export const todoTitleStyle: CSSProperties = {
  flex: 1,
  marginLeft: '10px'
};

export const deleteButtonStyle: CSSProperties = {
  marginLeft: '10px',
  padding: '5px 10px',
  background: '#dc3545',
  border: 'none',
  borderRadius: '4px',
  color: '#fff',
  cursor: 'pointer'
};
