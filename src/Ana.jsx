import './Ana.css'
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer
} from "recharts";
import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

function Stat(props){
    return <div className = {props.clas}><b>{props.name}</b></div>
}

function Info(props){
    return(
        <div className="infor" style={{backgroundColor:props.color}}><b>{props.info}</b></div>
    )
}

function Achievement(props){
    return(
        <div className="stat">
            you have saved {props.percent}% of your {props.freq} goal!
        </div>
    )
}

function Achieve(props){
    return <div className="achieve">
        {props.info}
    </div>
}

function Expenditure(props){
    const data = [
        { name: "Travel", cost: 400, color:"#fbe3e8"},
        { name: "Food", cost: 700, color:"#f1b6c2" },
        { name: "Bills", cost: 200, color: "#2d8bba"},
        { name: "Miscellaneous", cost: 1000, color:"#2f5f98" },
    ];
    return(<div className="expenditure">
        <div className="monthname">
            <div>{props.month}</div>
        </div>
        <div className="barchart">
        <ResponsiveContainer>
        <BarChart data={data}>
            <Bar dataKey="cost" fill="green">
                {data.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={entry.color} />
  ))}
            </Bar>
            <CartesianGrid stroke="#ccc"  vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
        </BarChart>
        </ResponsiveContainer>
        </div>
        <div>Expenditure in {props.month}</div>

    </div>

    );
}

function ThePie(){
        const [activeIndex, setActiveIndex] = useState(-1);
    
        const data = [
            { name: 'Spent', cost: 1200 },
            { name: 'left', cost: 800 }
        ];
    
        const COLORS = ['#2f5f98', '#2d8bba'];
    
        const onPieEnter = (_, index) => {
            setActiveIndex(index);
        };
    
        return (
            <div className="spentpie">
            <PieChart width={100} height={100}>
                <Pie
                    activeIndex={activeIndex}
                    data={data}
                    dataKey="cost"
                    outerRadius="100%"
                    innerRadius="70%"
                    fill="green"
                    onMouseEnter={onPieEnter}
                    style={{ cursor: 'pointer', outline: 'none' }} // Ensure no outline on focus
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>  
            </div>
    );
}

function Ana(){
    return(
        <div className="allofit">
            <div className="thestats">
                <Stat clas="expen" name="Expenses: 2000"/>
                <Stat clas="inc" name="Income: 2000"/>
                <Stat clas="save" name="Savings: 2000"/>
                <Stat clas="budg" name="Budget: 2000"/>
            </div>
            <div className = "therest">
                <div className="leftside">
                    <div className="topleft">
                        <div className="pie">
                            <ThePie/>
                            <p>60% of your budget used</p>
                        </div>
                        <div className="topright">
                            <Info info="You spent the most on the Bills category this month" color="#2d8bba"/>
                            <Info info="You spent the least on the Travel category this month" color="#fbe3e8"/>
                        </div>
                    </div>
                    <div className="bottomleft">
                        <p><b>ACHIEVEMENTS:</b></p>
                        <div className="morestats">
                            <div className="stats">
                                <Achievement freq="overall" percent={67}/>
                                <Achievement freq="monthly" percent={60}/>
                                <Achieve info="You have logged in 12 of 25 days this month!"/>
                                <Achieve info="You have logged 50+ transactions!"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightside">
                    <Expenditure month="October"/>
                </div>
            </div>
        </div>
    )
}

export default Ana;
