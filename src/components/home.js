import React,{useEffect, useState} from 'react';
import {VscSettings} from 'react-icons/vsc';
import {IoIosArrowDown} from 'react-icons/io';
import FilterView from './filterView';


const Home = () => {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState({
    grouping: '',
    ordering: ''
  })
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFilter({...filter, [name] : value});
  }
  useEffect(() => {
    setFilter({...filter, grouping : "userId"})
  },[])
  return (
    <>
        <div className='home-heading'>
            <div className='menu' onClick={()=>setMenu(!menu)}><VscSettings className='icon'/>Display<IoIosArrowDown/></div>
            {menu && (
            <div className='open-menu'>
                <div className='main-select'><span className='text'>Grouping</span> 
                    <select className='select' value={filter.grouping} name='grouping' onClick={() => setFilter({...filter, ordering:""})} onChange={handleChange}>
                        <option value='status'>Status</option>
                        <option value='userId'>User</option>
                        <option value='priority'>Priority</option>
                    </select>
                </div>
                <div className='main-select'><span className='text'>Ordering</span> 
                    <select className='select' name='ordering' onChange={handleChange} value={filter.ordering}>
                        <option value=''>no order</option>
                        <option value='title'>Title</option>
                        <option value='priority'>Priority</option>
                    </select>
                </div>
            </div>)}
        </div>
        <div className='body'>
            <FilterView group={filter.grouping} order={filter.ordering} />
        </div>
    </>
  )
}

export default Home;