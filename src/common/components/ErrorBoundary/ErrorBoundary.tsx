import React, { Component, ErrorInfo, ReactNode } from "react";
import styles from "./ErrorBoundary.module.css";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  handleReload() {
    window.location.reload();
  }

  componentDidCatch(error: Error , errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Something went wrong!</h2>
          <p className={styles.text}>
            {this.state.error && this.state.error.toString()}
          </p>
          <p className={styles.text}>
            Please refresh the page or come back later.
          </p>
          <button className={styles.button} onClick={this.handleReload}>
            Reload
          </button>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}
