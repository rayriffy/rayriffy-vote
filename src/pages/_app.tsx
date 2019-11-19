import React from 'react'

import App from 'next/app'

import AppShell from '../app/components'

class NextApp extends App {
  public render() {
    const { Component, pageProps } = this.props

    return (
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    )
  }
}

export default NextApp
