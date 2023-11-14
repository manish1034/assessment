import React from 'react';
import {BsPersonCircle} from 'react-icons/bs';

const Card = ({userId, id, title, tags, priority, userImg}) => {
    return (
        <div className='main-card'>
            <div className='card-head'>
                <div className='card-text'>{id}</div>
                {userImg && <div className='pic'><BsPersonCircle style={{color:"#413f3f", fontSize: 16}}/> </div>}
            </div>
            <div className='card-mid'>{title}</div>
            <div className='tags'>  
                {priority && <div style={{ display: "flex", alignItems:"center", borderRadius: "3px", border: "1px solid #ebebeb", padding: "0px 2px", fontSize: 14 }}>{priority}</div>}
                <div style={{display: "flex", alignItems: "center", color: "#6b6b6b", gap: 3, fontSize:"12px", borderRadius: "3px", border: "1px solid #ebebeb", padding: "2px"}}>
                    <div style={{height: '12px', width: '12px', borderRadius: '100%', background: '#a9abaf'}}></div> {tags}
                </div>
            </div>
        </div>
    )
    }

export default Card;