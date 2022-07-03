import { render } from 'preact';
import { GUI } from './components/GUI';
import './global.css';

render(<GUI />, document.querySelector('#preactRoot')!)