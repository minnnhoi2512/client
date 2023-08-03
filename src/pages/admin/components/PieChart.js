import { ResponsivePie } from '@nivo/pie'
import { useEffect, useState } from 'react'
import { URL_API } from './ConstDefine';
import axios from 'axios';

const PieChart = () => {

    const CorseColor = {
        0.43: "#FFB6C1", 
        0.29: "#FFFF00", 
        0.27: "#7FFF00", 
        0.1: "#DCDCDC", 

      };


    const coursename=[
        {
            "id":"Hatha Yoga Beginners",
            "label":1,
            "value": 0.43,
             color : "hsl(151, 70%, 50%)"
        },
        {
            "id":"Vinyasa Flow Yoga All Levels",
            "label":1,
            "value": 0.29,
             color : "hsl(151, 70%, 50%)"
        },
        {
            "id":"Therapeutic",
            "label":1,
            "value": 0.27,
             color : "hsl(151, 70%, 50%)"
        },
        {
            "id":"Other",
            "label":1,
            "value": 0.1,
             color : "hsl(151, 70%, 50%)"
        }

    ]
    return(
        <div style={{ height: "100%", width: "100%" }}>
        <h2 style={{ textAlign: 'center', padding: '8px',color:'white'}}>Rate of courses</h2>
        <ResponsivePie
        data={coursename}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        valueFormat=" >-~%"
        innerRadius={0.45}
        padAngle={3}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={({ id, data }) => CorseColor[data.value]}
        borderWidth={2}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '0'
                ]
            ]
        }}
        arcLinkLabelsTextOffset={4}
        arcLinkLabelsTextColor="#ffffff"
        arcLinkLabelsOffset={-3}
        arcLinkLabelsDiagonalLength={10}
        arcLinkLabelsStraightLength={6}
        arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
        arcLabelsRadiusOffset={0.55}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
       
        motionConfig={{
            mass: 1,
            tension: 170,
            friction: 26,
            clamp: false,
            precision: 0.01,
            velocity: 0
        }}
       
    />
    </div>
    )
}
export default PieChart