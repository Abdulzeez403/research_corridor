"use client"
import React, { useEffect } from 'react'
import { useProgress } from './context';

export const ProgressDetial = () => {
    const { allProgress, loading, error, getAllProgress, getSingleProgress, addProgress } = useProgress();

    useEffect(() => {

        getAllProgress('2023-2024');
        console.log(allProgress)
    }, []);

    return (
        <div>ProgressDetial</div>
    )
}
