import React from 'react'
import { Detail } from './detail'
import { ValidationRequestsProvider } from './context'

export default function page() {
    return (
        <div>
            <ValidationRequestsProvider>
                <Detail />
            </ValidationRequestsProvider>
        </div>
    )
}
