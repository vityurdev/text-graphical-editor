import React from 'react';

import './Description.css';

class Description extends React.Component {
  render() {
    return (
      <section className="description">
        <p>This is text graphic editor made by <b>Vitaly Yurenya</b> as a test task for CodeX Software.</p>
        <p>Some points worth mentioning:</p>
        <ol>
          <li><p>Given a choice between "push" and "spread" to add element(s) to array, it has been decided to use spread syntax since it appears to be significantly faster than <code>Array.prototype.push</code> in most popular browsers. <a target="_blank" rel="noopener noreferrer" href="https://www.measurethat.net/Benchmarks/Show/4223/0/array-concat-vs-spread-operator-vs-push">Proof.</a></p></li>
          <li><p>The simplest and naive way to implement "bucket fill" (<code>"B x y o"</code>) is to use stack-based recursive algorithm named Flood Fill. However, call stack in browsers can be easily overflown when dealing with recursion-based algorithms. Therefore queue-based implementation of Flood Fill (sometimes called Forest Fire) has been chosen to enable users to fill a certain zone with some color. <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Flood_fill#Alternative_implementations">More on Forest Fire</a></p></li>
          <li><p>This task also requires producing text file with step-by-step guide as an output which can be gigantic if there is large canvas as well as long sequence of drawing steps. Since storing large volumes of text in React state can lead to performance failure, guide data storing using IndexedDB API has been implemented in order to tackle this issue. <a target="_blank" rel="noopener noreferrer" href="https://dexie.org/">Dexie</a>, minimalistic wrapper for IndexedDB, has been used to simplify the working process.</p></li>
        </ol>
      </section> 
    )
  }
}

export default Description;