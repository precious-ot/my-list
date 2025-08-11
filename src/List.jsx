import { useEffect, useState } from "react";
import todoImage from "./Images/to-do.jpg"

export function List({setArtists, setDescribe, describe, setName, name, artists, setAdd,}) {
  const addTask = () => {
       setArtists([...artists,{name:name, describe: describe}]);
       setAdd(false)
    
  };
     return (
        <div className="bg-blue-950 py-10 px-10">
          <div className="flex">
            <div onClick={() => setAdd(false)} className="place-items-start"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#bedbff" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
               <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
               </svg></div>
            <h1 className="font-bold place-items-center grow-1 text-center text-3xl text-blue-200 uppercase">add new things</h1>
          </div>
            <div className="text-start grid place-items-start mt-20">
            <input className="text-blue-200 ps-1 pb-2 border-b-2 w-full focus:outline-none md:w-lg border-blue-200" placeholder="Title" value={name} onChange={e => setName(e.target.value)}/>
            <br />
            <textarea placeholder="Describtion" className="text-blue-200 rounded-lg px-3 mb-20 border-2 h-50 mt-15 w-full  py-2 md:w-lg focus:outline-none border-blue-200" value={describe} onChange={e => setDescribe(e.target.value)}/>
             <button className="bg-blue-200 text-blue-900 w-full md:w-lg py-2 rounded-lg font-semibold 
             uppercase" onClick={addTask}> add your thing</button>
            </div>
            
        </div>
     )
}


let initialArtist = [
        {id:0, name: 'My phone', describe: 'I want to repair my phone next week'},
        {id:1, name: 'My phone', describe: 'i dont have money'},
        {id:2, name: 'My phone', describe: 'i dont have money'},
        {id:3, name: 'My phone', describe: 'i dont have money'},
        {id:4, name: 'My phone', describe: 'i dont have money'},
        
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

    const handleAdd = () => {
    setAdd(true)
    }

    if(add) {
      return <List setName={setName} setArtists={setArtists} setDescribe={setDescribe} name={name} describe={describe} setAdd={setAdd} artists={artists}/>
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
         

    
    return(
       <div className="py-10 px-5 sm:px-10">
        <div className="bg-contain bg-no-repeat py-8 rounded-lg" style={{
          background: `url(${todoImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
          }}>
         <h1 className="font-bold text-blue-950 text-4xl">To Do List</h1>
         </div>
        <div className="mt-20 md:px-10">
          <div>
          {artists.map(artist => (
            <div key={artist.id} className=" mb-5 w-full md:w-xl rounded-xl text-start bg-blue-100">
              {editingTodoId === artist.id ? (
              <div className="bg-blue-100 rounded-xl">
              <div className="rounded-xl grid grid-cols-[200px_50px] sm:flex place-items-center gap-1 bg-blue-200 py-3 px-3">
              <input className="text-blue-900 mx-3 sm:grow-1 w-auto px-3 mb-3 py-2 border-b-2 focus:outline-none border-blue-900" type="text" value={editText} onChange={handleInput} />
              <button className="rounded-lg text-blue-200" onClick={handleSave}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#1c398e" class="bi bi-check-square-fill" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
              </svg></button>
              </div>
              <div className="py-3 flex px-3">
              <textarea className="text-blue-900 mx-3 w-full px-3 py-2 border-2 focus:outline-offset-1 focus:outline-blue-900 rounded-lg  border-blue-900" type="text" value={editDescribe} onChange={handleTextarea}/>
              </div>
            </div>
              ) : (
              <div>
              <div className="flex gap-3 rounded-xl bg-blue-200 py-3 px-3 place-items-center">
              <h1 className="font-semibold text-blue-900 text-xl grow-1">{artist.name}</h1>
                <button onClick={() => handleOpen(artist.id)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#1c398e" class="bi bi-envelope-heart" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l3.235 1.94a2.8 2.8 0 0 0-.233 1.027L1 5.384v5.721l3.453-2.124q.219.416.55.835l-3.97 2.443A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741l-3.968-2.442q.33-.421.55-.836L15 11.105V5.383l-3.002 1.801a2.8 2.8 0 0 0-.233-1.026L15 4.217V4a1 1 0 0 0-1-1zm6 2.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
                </svg></button>
              </div>
              {open === artist.id &&(
                <div className="flex py-3 px-3 gap-3">
                <p className="text-blue-900 text-sm grow-1">{artist.describe}</p>
                <button onClick={() => removeList(artist.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#1c398e" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg></button>
              <button onClick={() => handleEdit(artist.id, artist.name, artist.describe)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#1c398e" class="bi bi-pen" viewBox="0 0 16 16">
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
              </svg></button>
                </div>
              )}
            </div> )}
            </div>
          ))}
          </div>
          <button onClick={handleAdd} className="bg-blue-200 fixed bottom-5 shadow-lg shadow-blue-500/100 text-center px-3 py-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#1c398e" class="bi bi-plus-lg" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
          </svg></button>
          
          
        </div>
       </div>
    )
}