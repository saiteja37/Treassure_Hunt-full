import React from "react";
import { useEffect, useState } from 'react'
import axios from 'axios'
import './Lead.css'
const Lead = () => {
    const tok = localStorage.getItem("pos-user");
    const [modal, setModal] = useState(false)
    const ans = tok.slice(1)
    const token = ans.slice(0, ans.length - 1)
    const [data, setData] = useState()
    const [list, setList] = useState([])
    axios.get("http://localhost:2000/rank").then((res) => {
        setList(res.data)
    })
   

        axios.get("http://localhost:2000/profile", {
            headers: {
                "x-token": token
            }
        }).then((res) => {
            setModal(true)
            setData(res.data)
        })
    return (
        <center>
            <div style={{ width: "700px" }}>
                <h1 color="blue" style={{ paddingTop: "30%" }}>Leaderboard</h1>
                <hr />
                {data ? <div>
                    <h1 color="">Hi {data.name}</h1>
                </div> : <h1>Loading</h1>}
                {list?
                <table>
                    <tr>
                        <th>Rank</th>
                        <th>Player Name</th>
                        <th>No of Moves</th>
                    </tr>
                    {list.map(((item,index)=>
                        <tr>
                            <td class="td">{index+1}</td>
                            <td >{item.person}</td>
                            <td>{item.count}</td>
                        </tr>
                    ))}
                </table>:"Loading"}
                <h3><a href="/home">Back To Game</a></h3>
            </div>
        </center>
    )
}
export default Lead