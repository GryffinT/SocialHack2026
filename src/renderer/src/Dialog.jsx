import React, {useState} from 'react';
import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./App.css";



const DialogDefault = ({onSubmit}) => {

	//console.log("DialogDefault rendered, onSubmit =", onSubmit);

	const[name,setName] = useState("");
	const[desc,setDesc] = useState("");

	function handleClick(){
		if (!name.trim()) return;         
		onSubmit(name.trim(), desc.trim());     
		setName("");
		setDesc("");
		
		

	}


	return(
	< Dialog.Root>
		<Dialog.Trigger asChild>
			<button className="Button violet">Add Node</button>
		</Dialog.Trigger>
		<Dialog.Portal>
			<Dialog.Overlay className="DialogOverlay" />
			<Dialog.Content className="DialogContent">
				<Dialog.Title className="DialogTitle">Node Creator</Dialog.Title>
				<Dialog.Description className="DialogDescription">
					Enter a label, importance level, and mode to create a node. The description field is optional.
				</Dialog.Description>
				<fieldset className="Fieldset">
					<label className="Label" htmlFor="name">
						Label
					</label>
					<input className="Input"
					value={name}
					onChange={(e) => setName(e.target.value)}
					/>
				</fieldset>
				<fieldset className="Fieldset">
					<label className="Label" htmlFor="Description">
						Description
					</label>
					<input className="Input"
					value={desc}
					onChange={(e) => setDesc(e.target.value)} />
				</fieldset>
				<div
					style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
				>
					<Dialog.Close asChild>
						<button id = "submitButton"
						 className="Button green"
						 onClick= {handleClick}>
						Instantiate Node</button>
					</Dialog.Close>
				</div>
				<Dialog.Close asChild>
					<button className="IconButton" aria-label="Close">
						<Cross2Icon />
					</button>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
);
}
export default DialogDefault
