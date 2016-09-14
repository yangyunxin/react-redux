import React from 'react';
import { render } from 'react-dom';
import a from './a.js';
import b from './b.js';

if(module.hot) {
    module.hot.accept();
}
render(
	<h1>{b.b}</h1>,
	document.getElementById('app')
);

