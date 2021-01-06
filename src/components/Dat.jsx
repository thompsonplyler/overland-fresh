import React from 'react';
import {useEffect, useState} from 'react'
import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui';

const Dat = () => {
    const [data,setData] = useState({
        d: {
            package: 'react-dat-gui',
            power: 9000,
            isAwesome: true,
            feelsLike: '#2FA1D6'
        }
    })
    const handleUpdate = (newData) => {
        
        // this.setState(prevState => ({
        //     data: { ...prevState.data, ...newData }
        //   }));

        setData(data=>({d:{newData}}))

    }

    return (
        <DatGui data={data} onUpdate={handleUpdate}>
            <DatString path='package' label='Package' />
            <DatNumber path='power' label='Power' min={9000} max={9999} step={1} />
            <DatBoolean path='isAwesome' label='Awesome?' />
            <DatColor path='feelsLike' label='Feels Like' />
        </DatGui>
    )
}

export default Dat