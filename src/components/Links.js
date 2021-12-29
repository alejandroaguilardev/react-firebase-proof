import React, { useEffect, useState } from "react";
import LinkForm from './LinkForm'
import { db } from '../firebase';
import { toast } from "react-toastify";

const Links = () => {
    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState("");

    const addOrEditLink = async (linkObject) => {
     try {
        if(currentId === ''){
            await db.collection('links').doc().set(linkObject);
            toast('Sitio Agregado', { type: 'success' });
          }else{
            await db.collection('links').doc(currentId).update(linkObject);
            toast('Sitio Editado', { type: 'info' });
            setCurrentId('');
          }
     } catch (error) {
         console.log("Error")
     }
    };

   

    const onDeleteLink = async (id) => {
        if (window.confirm('Estas seguro de eliminar el enlace')) {
            await db.collection('links').doc(id).delete();
            toast('Sitio Eliminado', {
                type: 'error',
                autoClose: 2000
            });
        }
    }

    const getLinks = async () => {
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs);
        });

    }
    useEffect(() => {
        getLinks()
    }, []);

    return (<div>
        <LinkForm addOrEditLink {...{addOrEditLink, currentId, links }} />
        <div className="col-md-12 mt-2">
            {links.map(link => (
                <div className="card mb-1" key={link.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h4>{link.name}</h4>
                            <div>
                                <i className="material-icons " onClick={() => setCurrentId(link.id)}>create</i>
                                <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>close</i>
                            </div>
                        </div>
                        <p>{link.description}</p>
                        <a href={link.url} target="_blank" rel="noreferrer"> Ir al sitio web</a>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )
}

export default Links;