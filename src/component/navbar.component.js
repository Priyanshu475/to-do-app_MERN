import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
<nav class="nav">
  <input type="checkbox" id="nav-check"></input>
  <div class="nav-header">
    <div class="nav-title">To-do-app</div>
  </div>
  <div class="nav-btn">
    <label for="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <ul class="nav-list">
    <Link className='linkn' to='/'><li>Home</li></Link>
    <Link className='linkn'to ='/create'><li>Create New Task</li></Link>
  </ul>
</nav>
    )
  }
}