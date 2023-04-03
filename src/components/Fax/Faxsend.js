import React, { useState, useRef  } from "react";
import './Faxsend.css'
import axios from "axios";
import Container from '@mui/material/Container';
import { InputText } from "primereact/inputtext";
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputTextarea } from "primereact/inputtextarea";


export default function Faxsend(){
    const toast = useRef(null);
    var message = {};
    const show = (message) => {
        toast.current.show({ severity: message.severity, summary: message.summary, detail: message.message});
    };
    

    const [toFax, setToFax] = useState('');
     const [fromFax, setFromFax] = useState('');
    
    const [text, setText] = useState('');
    
    
    const sendFax = () =>{
        const header = {
            headers:{
                'Content-Type': 'application/json',
            }
        }
        const body = {
            from:fromFax,
            to:toFax,
            faxDetail:text
        };
        if(!fromFax){
            message = {
                severity: 'error', 
                summary: 'フォムが伝送しませんでした。',
                message:"お名前を入力してください。"};
                show(message);
            
            }else if(!toFax){
                message = {
                    severity: 'error', 
                    summary: 'フォムが伝送しませんでした。',
                    message:"Fax番号を入力してください。"};
                    show(message);
            }else if(!text){
                message = {
                    severity: 'error', 
                    summary: 'フォムが伝送しませんでした。',
                    message:"文章を入力してください。"};
                    show(message);
            }else{
                axios.post("http://24.186.229.196:8000/api/faxdoc",body,header)
                .then(response => {
                    console.log(response.data);
                    if(response.data.data.messages[0].status === "INVALID_RECIPIENT"){
                        message = {
                            severity: 'error', 
                            summary: 'フォムが伝送しませんでした。',
                            message:"FAX番号が正確ではありません。"};
                    }else if(response.data.data.messages[0].status === "SUCCESS"){
                        message = {
                            severity: 'success', 
                            summary: 'フォムが伝送しました。',
                            message:"FAX番号が正確に伝送しました。"};
                    }
                    show(message);
                })
                .catch(error=>{
                    console.log("ERROR: " + error.response.data);
                });
            }
        
        

    }

    return(
        <div>
            <Container maxWidth="lg" >
                <div className="relative">
                <div className="text-5xl font-medium p-4">FAX 伝送</div>
                <i className="pi pi-print absolute print-icon" style={{ fontSize: '2.5rem' }}></i>
                </div>
                <div className="fax-box">
                <Toast ref={toast} />
                    <div className="small-title">FAX 伝送</div>
                    <div className="p-4">
                        <div>
                            <div className="card flex justify-content-center py-2">
                                <div className="w-2 text-right">
                                    <p className="px-4 text-lg">お名前:</p>
                                    </div>
                                <InputText className="w-10" placeholder="お名前を入力してください。" value={fromFax} onChange={(e) => setFromFax(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <div className="card flex justify-content-center py-2">
                                <div className="w-2 text-right">
                                    <p className="px-4 text-lg">受信者:</p>
                                    </div>
                                <InputText className="w-10" placeholder="受信者のFax番号を入力してください" value={toFax} onChange={(e) => setToFax(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <div className="card flex justify-content-center py-2">
                                <div className="w-2 text-right">
                                    <p className="px-4 text-lg">FAXの内容:</p>
                                </div>
                                <div className="w-10">
                                    {/* <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '300px' }} /> */}
                                    <InputTextarea className="w-full"　placeholder="Faxの内容を入力してください" autoResize value={text} onChange={(e) => setText(e.target.value)} rows={5} />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-content-end">               
                            <Button label="伝送" icon="pi pi-check" onClick={sendFax} />   
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}