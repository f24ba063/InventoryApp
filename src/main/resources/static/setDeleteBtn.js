import {fetchItem} from "./fetchItem.js";

export function setDeleteBtn(tableBody){
	tableBody.addEventListener('click', async (e) => {
		if(!e.target.classList.contains('delete-btn'))return;
		
		const id = e.target.dataset.id;
		if(!confirm(`ID:${id}を削除しますか？`)) return;
		
		try{
			const response = await fetch(`http://localhost:8080/api/items/${id}`, 
				{method : "DELETE"}
			);
			if(!response.ok) throw new Error("削除に失敗");
			fetchItem();
		}catch(err){
			console.error(err);
		}
	});
}