import React, { useEffect, useState } from "react";
import {AiOutlinePlus} from "react-icons/ai";
import {PiDotsThreeBold} from 'react-icons/pi';
import {BsPersonCircle} from "react-icons/bs";
import {MdOutlineNotificationImportant, MdSignalWifi4Bar, MdSignalWifiStatusbar3Bar, MdSignalWifiStatusbar1Bar} from 'react-icons/md';
import { FcTodoList,FcProcess,FcDataBackup,FcApproval,FcCancel } from "react-icons/fc";
import Card from "./card";
import axios from "axios";

const FilterView = ({ group, order }) => {
  const [original, setOriginal] = useState({
    originalTickets : undefined,
    originalUsers : undefined,
    originalTicketTabs : undefined
  });
  const [ticket, setTicket] = useState();
  const [ticketTabs, setTicketTabs] = useState([]);
  const [statusTab, setStatusTab] = useState([]);
  const [user, setUser] = useState();

  const priority = ["No priority", "Low", "Medium", "High", "Urgent"]
  const priorityIcons = [
    <PiDotsThreeBold />,
    <MdSignalWifiStatusbar1Bar />,
    <MdSignalWifiStatusbar3Bar />,
    <MdSignalWifi4Bar />,
    <MdOutlineNotificationImportant />
    ];
  const statusIcons = [
    {Backlog : <FcDataBackup />},
    {"In progress" : <FcProcess />},
    {Todo : <FcTodoList />},
    {Done : <FcApproval />},
    {Canceled : <FcCancel />}
    ];
  const data = async () => {
    const response = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");

    const tickets = response.data.tickets;
    const filteredData = tickets.map((item) => {
      if (group === "status") {
        return item.status;
      } else if (group === "userId") {
        return item.userId;
      } else {
        return item.priority;
      }});
      if (group === "status") {
        const icon = [...filteredData];
        icon.push("Done");
        icon.push("Canceled");
        setStatusTab([...new Set(icon)])
        setTicketTabs([...new Set(icon)]);
        setOriginal({
          originalTickets : response.data.tickets,
          originalUsers : response.data.users,
          originalTicketTabs : [...new Set(icon)]
        })
      }else{
        setOriginal({
          originalTickets : response.data.tickets,
          originalUsers : response.data.users,
          originalTicketTabs : [...new Set(filteredData)]
        })
        setTicketTabs([...new Set(filteredData)]);
      }
    setTicket(response.data.tickets);
    setUser(response.data.users);
  };
  useEffect(() => {
    data();
  }, [group]);

  useEffect(() => {

    if(original.originalTicketTabs || original.originalTickets || original.originalUsers){
      if (order === "priority") {
        if(group === "priority"){
          console.log("already filtered with priority for further try title filteration");
        }else{
          const tickets = [...original.originalTickets];
          const compareFunction = (a, b) => {
          if (a[order] > b[order]) return -1;
          if (a[order] < b[order]) return 1;
          return 0;
        };
        const sortedTickets = [...tickets].sort(compareFunction);
        setTicket(sortedTickets);
        }

      } else if(order === "title") {
        if(group === "userId"){
          const userData = [...original.originalUsers];
          
          // Define a sorting function based on the 'name' property
          const compareFunction = (a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          };
          
          // Sort the userData using the defined compareFunction
          const sortedUserData = [...userData].sort(compareFunction);
          setTicketTabs(sortedUserData?.map(item => item.id));

        }else if(group === "status"){
          const statusData = [...original.originalTicketTabs];
          
          // Define a sorting function based on the 'name' property
          const compareFunction = (a, b) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
          };
          
          // Sort the userData using the defined compareFunction
          const sortedStatusData = [...statusData].sort(compareFunction);
          setStatusTab(sortedStatusData);
        } else if(group === "priority"){
          const priorityData = [...original.originalTicketTabs];
          
          // Define a sorting function based on the 'name' property
          const compareFunction = (a, b) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
          };
          
          // Sort the userData using the defined compareFunction
          const sortedStatusData = [...priorityData].sort(compareFunction);
          setTicketTabs(sortedStatusData);
        }
      }
      else {
        setTicket(original.originalTickets);
        setTicketTabs([...original.originalTicketTabs]);
        setStatusTab([...original.originalTicketTabs]);
      }
    }


  }, [order, group]);

  return (
    <div>
      {group === "userId" ? (
        <div style={{ display: "flex", gap: 10}}>
          {ticketTabs.map((item) => (
            <div style={{ display: "flex", flexDirection: "column"}}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px"}}>
                <div style={{display: "flex", gap: 10, alignItems: "center", fontSize: "16px", margin: "0px 4px"}}><BsPersonCircle style={{color:"#413f3f"}}/>{user.filter((items) => items.id === item)[0]?.name}</div>
                <div><AiOutlinePlus style={{color: "#6b6b6b", marginRight: "6px"}}/><PiDotsThreeBold style={{color: "#6b6b6b"}}/></div>
              </div>
              {ticket?.filter((items) => items.userId === item).map((data1, index) => (
                  <Card key={index} userId={data1.userId} id={data1.id} title={data1.title} tags={data1.tag} priority={priorityIcons[data1.priority]} userImg={false}/>
                ))}
            </div>
          ))}
        </div>
      ) : group === "status" ? (
        <div style={{display: "flex", gap: 10, }}>
          {statusTab?.map((item) => (
            <div style={{display: "flex", flexDirection: "column", }}>
              <div style={{display: "flex", justifyContent: "space-between", marginBottom: "24px", width: "16rem"}}>
                <div style={{ display: "flex", alignItems:"center", gap: 10, fontSize: "16px", margin: "0px 4px"}}>
                  {statusIcons.filter((i,index) => i[item]) && statusIcons.filter((i,index) => i[item])[0][item]}{item}
                </div>
                <div><AiOutlinePlus style={{color: "#6b6b6b", marginRight: "6px"}}/><PiDotsThreeBold style={{color: "#6b6b6b"}}/></div>
              </div>
              {ticket?.filter((items) => items.status === item).map((data1, index) => (
                  <Card key={index} userId={data1.userId} id={data1.id} title={data1.title} tags={data1.tag} priority={priorityIcons[data1.priority]} userImg={true}/>
                ))}
            </div>
          ))}
        </div>
      ) : group === "priority" ? (
        <div style={{display: "flex", gap: 10}}>
          {ticketTabs.map((item, index) => (
            <div style={{display: "flex", flexDirection: "column"}}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px"}}>
                <div style={{display: "flex", gap: 10, alignItems: "center", fontSize: "16px", margin: "0px 4px"}}>{priorityIcons[item]} {priority[item]}</div>
                <div><AiOutlinePlus style={{color: "#6b6b6b", marginRight: "6px"}}/><PiDotsThreeBold style={{color: "#6b6b6b"}}/></div>
              </div>
              {/* <div style={{ display: "flex", alignItems:"center", gap: 10, marginBottom: "24px"}}>{priorityIcons[item]} {priority[item]}</div> */}
              {ticket?.filter((items) => items.priority === item).map((data1, index) => (
                  <Card key={index} userId={data1.userId} id={data1.id} title={data1.title} tags={data1.tag} userImg={true}/>
                ))}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FilterView;
