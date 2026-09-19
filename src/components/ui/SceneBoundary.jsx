import { Component } from 'react';

// WebGL scenes are lazy-loaded, so a chunk or context failure must degrade to a
// static visual instead of unmounting the surrounding section.
export default class SceneBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    const { children, fallback = null } = this.props;
    return this.state.failed ? fallback : children;
  }
}
