import {setEditMode} from './formHandler.js';

export function setEditBtn(tableBody){
tableBody.querySelectorAll(".edit-btn").forEach(btn => {
			btn.addEventListener("click", (e) => {
				const tr = e.target.closest("tr");
				const id = e.target.dataset.id;
				const name = tr.children[1].textContent;
				const quantity = tr.children[2].textContent;
				const price = tr.children[3].textContent;
				setEditMode(id, name, quantity, price);
			});
		});
	}