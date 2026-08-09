import React, { Component } from 'react';
import { AdminErrorState } from './AdminPageState';

type Props = { children: React.ReactNode };
type State = { error: Error | null };

export class AdminErrorBoundary extends Component<Props, State> {
  declare readonly props: Readonly<Props>;
  state: State = { error: null };


  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  handleRetry = () => {
    window.location.reload();
  };

  render() {
    if (this.state.error) {
      return <AdminErrorState title="Admin page crashed safely" message="No data was changed. Retry this page or refresh the workspace." onRetry={this.handleRetry} />;
    }
    return this.props.children;
  }
}
