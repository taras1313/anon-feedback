import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });
// Object.defineProperty(window, 'confirm', { value: () => {}, writable: true });
