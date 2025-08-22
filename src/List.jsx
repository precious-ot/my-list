import { useState } from "react";
import { format, startOfWeek, addDays, isSameDay, getTime } from "date-fns";

let initialArtist = [
        {id:0, name: 'My phone', describe: 'I want to repair my phone next week', status: "all" | "in-progress" | "completed", time: new Date().toLocaleTimeString()},
        {id:1, name: 'My phone', describe: 'i dont have money', status: "all" | "in-progress" | "completed", time: new Date().toLocaleTimeString()},
        {id:2, name: 'My phone', describe: 'i dont have money', status: "all" | "in-progress" | "completed", time: new Date().toLocaleTimeString()},
        {id:3, name: 'My phone', describe: 'i dont have money', status: "all" | "in-progress" | "completed", time: new Date().toLocaleTimeString()},
        {id:4, name: 'My phone', describe: 'i dont have money', status: "all" | "in-progress" | "completed", time: new Date().toLocaleTimeString()},
        
    ]

export default function Todo ({artist}) {
    const [add,setAdd] = useState(false);
    const [name, setName] = useState('');
    const [describe, setDescribe] = useState('');
    const [artists, setArtists] = useState(initialArtist);
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editText, setEditText] = useState('');
    const [editDescribe, setEditDescribe] = useState('');
    const [open, setOpen] = useState(null);
    const [all, setAll] = useState(true);
    const [inProgress, setInProgress] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [select, setSelect] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    const today = new Date();
    const start = startOfWeek(currentDate, {weekStartsOn: 1});

    const days = [...Array(7)].map((_, i) => addDays(start, i));
    
    const handleAll = () => {
      setAll(!all)
      setInProgress(false);
      setCompleted(false)
    }

    const handleProgress = () => {
      setInProgress(true)
      setAll(false);
      setCompleted(false)
    }

    const handleComplete = () => {
      setCompleted(true)
      setAll(false)
      setInProgress(false)
    }

    const addTask = () => {
       setArtists([...artists, {name:name, describe: describe, status: "all", time: new Date().toLocaleTimeString()}]);
       setName("");
       setDescribe("");
       setAdd(false)
  };

    const handleAdd = () => {
    setAdd(true)
    }

    

    const handleOpen = (id) => {
      setOpen(open === id ? null : id)
    }  

    const removeList = (id) => {
      setArtists(artists.filter(artist =>artist.id !== id))
    }

    const handleEdit = (id, name, describe) => {
      setEditingTodoId(id);
      setEditText(name);
      setEditDescribe(describe);
    };

    const handleInput = (e) => {
      setEditText(e.target.value);
    };

    const handleTextarea = (e) => {
      setEditDescribe(e.target.value)
    };

    const handleSave = () => {
      const updatedTodos = artists.map((artist) => artist.id === editingTodoId ? {...artist, name: editText, describe: editDescribe} : artist
    );
    setArtists(updatedTodos);
    setEditingTodoId(null);
    setEditText('');
    setEditDescribe('');
    };
         
    const renderList = (status) => (
      artists.filter(artist => status === "all" ? true : artist.status === status)
      .map(artist => (
            <div key={artist.id} className="mb-5 w-full md:w-xl rounded-xl text-start bg-gradient-to-r from-slate-900 via-violet-900 to-indigo-800">
              {editingTodoId === artist.id ? (
              <div className="bg-gradient-to-r from-slate-950 via-violet-950 to-indigo-900 rounded-xl">
              <div className="rounded-xl grid grid-cols-[200px_50px] sm:flex place-items-center gap-1 bg-gradient-to-r from-slate-950 via-violet-950 to-indigo-900 py-3 px-3">
              <input className="text-indigo-200 mx-3 sm:grow-1 w-auto px-3 mb-3 py-2 border-b-2 focus:outline-none border-indigo-200" type="text" value={editText} onChange={handleInput} />
              <button className="rounded-lg" onClick={handleSave}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#e0e7ff" class="bi bi-check-square-fill" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
              </svg></button>
              </div>
              <div className="py-3 flex px-3">
              <textarea className="text-indigo-200 mx-3 w-full px-3 py-2 border-2 focus:outline-offset-1 focus:outline-none rounded-lg  border-indigo-200" type="text" value={editDescribe} onChange={handleTextarea}/>
              </div>
            </div>
              ) : (
              <div>
              <div className="flex gap-3 rounded-xl bg-gradient-to-r from-slate-950 via-violet-950 to-indigo-900 py-3 px-3 place-items-center">
                <div className="grow-1">
              <h1 className="font-semibold text-indigo-200 text-xl">{artist.name}</h1>
              <div className="flex gap-2 place-items-center py-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="#e0e7ff" class="bi bi-clock" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                </svg>
                <span className="text-indigo-200 text-sm font-medium">{artist.time}</span>
              </div>
              </div>
                <button onClick={() => handleOpen(artist.id)}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#e0e7ff" class="bi bi-envelope-heart" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l3.235 1.94a2.8 2.8 0 0 0-.233 1.027L1 5.384v5.721l3.453-2.124q.219.416.55.835l-3.97 2.443A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741l-3.968-2.442q.33-.421.55-.836L15 11.105V5.383l-3.002 1.801a2.8 2.8 0 0 0-.233-1.026L15 4.217V4a1 1 0 0 0-1-1zm6 2.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
                </svg></button>
                
              </div>
              {open === artist.id &&(
                <div className="flex py-3 px-3 gap-3">
                <p className="text-indigo-200 text-sm grow-1">{artist.describe}</p>
                  <select className= "focus:outline-0 px-2 py-2 rounded-xl bg-indigo-950 text-indigo-200 hover:bg-violet-950" value={artist.status} onChange={(e) => updateStatus(artist.id, e.target.value)}>
                    <option value="all">All List</option>
                    <option onClick={() => setSelect(true)} value="in-progress">In-progress</option>
                    <option value="completed">Completed</option>
                  </select>
                <button onClick={() => removeList(artist.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#e0e7ff" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg></button>
              <button onClick={() => handleEdit(artist.id, artist.name, artist.describe)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#e0e7ff" class="bi bi-pen" viewBox="0 0 16 16">
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
              </svg></button>
                </div>
              )}
            </div> )}
            </div>
          ))
    );

    const updateStatus = (id, status) => {
      setArtists(artists.map(artist => artist.id === id ? {...artist, status} : artist));
    };

    return(
       <div className="relative">
        <div className={`${add ? "blur-md" : "blur-none"}`}>
        <div className="text-start px-5 pt-20 sm:px-10">
          <div className="flex gap-4 text-indigo-100">
             <h1 className="font-bold text-indigo-200 text-4xl grow-1 place-items-center">Today Task</h1>
             <div className="place-items-center grid">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#e0e7ff" class="bi bi-bell" viewBox="0 0 16 16">
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
              </svg>
              </div>
              <div className="place-items-center grid">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#e0e7ff" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
              </svg>
              </div>
          </div>
         <div className="mt-8 flex gap-2 place-items-center"><span>
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#e0e7ff" class="bi bi-calendar-event" viewBox="0 0 16 16">
          <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
          </svg>
          </span><p className="text-xl font-semibold text-indigo-200">{format(currentDate, "EEEE")}, {format(currentDate, "dd MMMM yyyy")}</p></div>
         <div className="grid grid-cols-7 place-items-center gap-2 mt-10 text-center">
          {days.map((day, i) => (
            <div key={i} className={`${isSameDay(day, today) ? "bg-gradient-to-r from-slate-900 via-violet-900 to-indigo-800 w-10 sm:w-20 rounded-t-full rounded-b-full py-2" : "bg-none"}`}>
              <p className="mb-5 text-indigo-200 text-md sm:text-lg font-semibold">{format(day, "EEE")}</p>
              <p className="text-indigo-200">{format(day, "dd")}</p>
            </div>
          ))}
         </div>
         <div className="px-6 flex justify-between mt-4">
          <button onClick={() => setCurrentDate(addDays(currentDate, -7))}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#e0e7ff" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
          </button>
          <button onClick={() => setCurrentDate(addDays(currentDate, 7))}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#e0e7ff" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
            </svg>
          </button>
         </div>
         </div>
          
        <div className="bg-indigo-200 rounded-t-[8vw] mt-20 pt-15 px-5 md:px-10 h-full">
          <div className="flex gap-4 pb-5">
            <button onClick={handleAll} className={ all === true ? "border-b-3 rounded-lg py-1  px-1 border-indigo-950 cursor-pointer font-bold text-xl sm:text-2xl text-indigo-950" : "border-b-none cursor-pointer font-bold text-xl sm:text-2xl text-indigo-950"}>All Task</button>
            <button onClick={handleProgress} className={ inProgress === true ? "border-b-3 py-1 rounded-lg px-1 border-indigo-950 cursor-pointer font-bold text-xl sm:text-2xl text-indigo-950" : "border-b-none cursor-pointer font-bold text-xl sm:text-2xl text-indigo-950"}>In-Progress</button> 
            <button onClick={handleComplete} className={ completed === true ? "border-b-3 py-1 rounded-lg px-1 border-indigo-950 cursor-pointer font-bold text-xl sm:text-2xl text-indigo-950" : "border-b-none cursor-pointer font-bold text-xl sm:text-2xl text-indigo-950"}>Completed</button>
          </div>
          <div>
           {all &&
            <div className="mt-10">
              {renderList("all")}
            </div>
            } 
            <div className="pt-10 pb-5">
              {inProgress && (
              renderList("in-progress") && renderList("in-progress").length > 
              0 ? (renderList("in-progress")
            ) : (
              <div className="flex gap-4 my-15 place-items-center opacity-50 place-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#1e1a4d" class="bi bi-list-task" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z"/>
                <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z"/>
                <path fill-rule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z"/>
                </svg>
               <p className="text-lg font-medium text-indigo-950">No task found in progress</p></div>
            )
            )
            }
            {completed && (
              renderList("completed") && renderList("completed").length > 
              0 ? (renderList("completed")
            ) : (
              <div className="flex gap-4 my-15 place-items-center opacity-50 place-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#1e1a4d" class="bi bi-list-task" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z"/>
                <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z"/>
                <path fill-rule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z"/>
                </svg>
               <p className="text-lg font-medium text-indigo-950">No task found in completed task</p></div>
            ))
            }
            </div>
          </div>
          <button onClick={handleAdd} className="bg-gradient-to-r from-slate-950 via-violet-950 to-indigo-900 shadow-xl shadow-violet-400 fixed bottom-5 right-20 shadow-lg shadow-blue-500/100 text-center px-3 py-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#e0e7ff" class="bi bi-plus-lg" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
          </svg></button> 
        </div>
        </div>
        {add && 
        <div className="bg-gradient-to-r from-slate-950 via-violet-950 to-indigo-900 shadow-md shadow-violet-400 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-70 sm:w-auto h-auto py-10 px-5 sm:px-10">
          <div className="flex">
            <div onClick={() => setAdd(false)} className="place-items-start"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#bedbff" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
               <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
               </svg></div>
            <h1 className="font-bold place-items-center grow-1 text-indigo-200 text-center text-xl sm:text-2xl md:text-3xl uppercase">add new things</h1>
          </div>
            <div className="text-start grid place-items-start mt-20">
            <input className= "ps-1 pb-2 border-b-2 w-full focus:outline-none text-indigo-200 border-indigo-200" placeholder="Title" value={name} onChange={e => setName(e.target.value)}/>  
            <br />
            <textarea placeholder="Describtion" className="rounded-lg px-3 mb-20 border-2 h-auto mt-15 w-full text-indigo-200  py-2 md:w-lg focus:outline-none border-indigo-200" value={describe} onChange={e => setDescribe(e.target.value)}/>
             <button className="bg-indigo-200 text-indigo-950 cursor-pointer w-full md:w-lg py-2 rounded-lg font-semibold 
             uppercase" onClick={addTask}> add your thing</button>
            </div>
            
        </div>
        }
       </div>
    )
}