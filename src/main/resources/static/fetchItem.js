import {setEditBtn} from './setEditBtn.js';
import {setDeleteBtn} from '/\setDeleteBtn.js';

const tableBody = document.querySelector("#item-table tbody");

//APIから在庫一覧を獲得してテーブルに描写
export async function fetchItem(sortBy = "id", order = "asc"){
	const response = await fetch(`http://localhost:8080/api/items?sortBy=${sortBy}&order=${order}`);
		
	
	try{	
		if(!response.ok){
			throw new Error("データの取得に失敗しました");
		}
		
		const items = await response.json();
			
		//tbodyを空にする
		tableBody.innerHTML = "";
		
		//取得アイテムをテーブルに追加
		items.forEach(item => {
			const tr = document.createElement("tr");
			tr.innerHTML = `
			<td>${item.id}</td>
			<td>${item.name}</td>
			<td>${item.quantity}</td>
			<td>${item.price}</td>
			<td>
				<button data-id="${item.id}" class="edit-btn">編集</button>
				<button data-id="${item.id}" class="delete-btn">削除</button>
			</td>
			`;
			tableBody.appendChild(tr);
		});

		setEditBtn(tableBody);

		setDeleteBtn(tableBody);
		
	}catch(error){
		console.error("取得データのhtmlへの挿入に失敗しました：" + error)
	}
}