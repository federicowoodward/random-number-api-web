'use client'

import axios from 'axios'
import { useState } from 'react'
import RouletteWheelComponent from './roulette.module'
import styles from './page.module.css'
import loaderStyles from './loader.module.css'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; 

export default function Page() {
    const [number, setNumber] = useState<number>(0)
    const [spinningState, setSpinningState] = useState<number>(0)
    const [error, setError] = useState<string | null>(null)

    async function GetRandomNumber() {
        setSpinningState(1)

        try {
            const response = await axios.post(`${API_URL}/random`)
            setNumber(response.data.value)
            setSpinningState(2)
        } catch (error) {
            console.error('Error al obtener el número:', error)
            setSpinningState(0)
            setError(
                'No se pudo obtener el número. Hubo un problema con el servidor.'
            )
        }
    }

    function handleSpin() {
        setSpinningState(2)
    }

    function handleCloseModal() {
        setNumber(0)
        setSpinningState(0)
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <div className={styles.home}>
                {error && (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                )}
                {spinningState === 0 ? (
                    <button
                        onClick={GetRandomNumber}
                        className={styles.spinButton}
                    >
                        Girar!
                    </button>
                ) : (
                    <button className={styles.spinButton}>
                        <div className={loaderStyles.loader}></div>
                    </button>
                )}
                <RouletteWheelComponent
                    numberOfRoulette={number}
                    onSpin={handleSpin}
                    onModalClose={handleCloseModal}
                />
            </div>
        </ThemeProvider>
    )
}
