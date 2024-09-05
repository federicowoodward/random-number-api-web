'use client'

import { useEffect, useRef, useState } from 'react'
import Roulette from 'roulette-spinner'
import BasicModal from './modal.result'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

interface RouletteWheelProps {
    numberOfRoulette: number
    onSpin: (number: number) => void
    onModalClose: () => void
}

export default function RouletteWheelComponent({
    numberOfRoulette,
    onSpin,
    onModalClose,
}: RouletteWheelProps) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const initializedRef = useRef(false)
    const rouletteRef = useRef<Roulette | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (containerRef.current && !initializedRef.current) {
            const sections = Array.from({ length: 100 }, (_, i) => i + 1)
            rouletteRef.current = new Roulette({
                container: containerRef.current,
                colors: ['red', 'black'],
                board: {
                    radius: 250,
                },
                arrow: {
                    element: 'standard',
                    color: 'yellow',
                },
                settings: {
                    roll: {
                        duration: 1500,
                        landing: 'edge',
                        delay: 0,
                    },
                    border: {
                        width: 2,
                        color: 'black',
                    },
                },
                sections: sections.map((value) => ({
                    value,
                    font_size: 6,
                    font_color: 'white',
                })),
            })

            initializedRef.current = true
        }
    }, [])

    useEffect(() => {
        if (rouletteRef.current && numberOfRoulette > 0) {
            // Start spinning the roulette
            const { promise, resolve } = Promise.withResolvers<number>()

            rouletteRef.current.asyncRollByIndex(promise)

            promise
                .then((result) => {
                    onSpin(result)
                })
                .catch((error) => {
                    console.error('Error durante el giro:', error)
                    setError('Error local, recarga la pagina.')
                })

            // simulacion de demora del servidor.
            setTimeout(() => {
                resolve(numberOfRoulette - 1)
                // este time out si es necesario porque espera el giro de la ruleta
                setTimeout(() => {
                    setModalOpen(true)
                }, 1500)
            }, 1500)
        }
    }, [numberOfRoulette, onSpin])

    return (
        <div ref={containerRef} style={{ transform: 'scale(1.6)' }}>
            {error && (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            )}
            {modalOpen && (
                <BasicModal
                    number={numberOfRoulette}
                    onClose={() => {
                        setModalOpen(false)
                        onModalClose()
                    }}
                />
            )}
        </div>
    )
}
