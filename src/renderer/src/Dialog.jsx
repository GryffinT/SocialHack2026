import React from 'react';
import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./App.css";

const DialogDefault = () => (
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
					<input className="Input" id="name" defaultValue="" />
				</fieldset>
				<fieldset className="Fieldset">
					<label className="Label" htmlFor="Description">
						Description
					</label>
					<input className="Input" id="username" defaultValue="" />
				</fieldset>
				<div
					style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
				>
					<Dialog.Close asChild>
						<button className="Button green">Instantiate Node</button>
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

export default DialogDefault;
