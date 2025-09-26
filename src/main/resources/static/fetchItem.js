import {setEditBtn} from './setEditBtn.js';

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
		
		//編集・削除ボタンのイベント設定
//		tableBody.querySelectorAll(".edit-btn").forEach(btn => {
//			btn.addEventListener("click", (e) => {
//				const tr = e.target.closest("tr");
//				const id = e.target.dataset.id;
//				const name = tr.children[1].textContent;
//				const quantity = tr.children[2].textContent;
//				const price = tr.children[3].textContent;
//				setEditMode(id, name, quantity, price);
//			});
//		});

		setEditBtn(tableBody);
		
//		tableBody.querySelectorAll(".delete-btn").forEach(btn=> {
//			btn.addEventListener('click', async(e) => {
//				const id = e.target.dataset.id;
//				if(!confirm(`ID:${id}を削除しますか？`))return;
//				
//				try{
//					const response = await fetch(`http://localhost:8080/api/items/${id}`, {
//						method: "DELETE"
//					});
//					if(!response.ok)throw new Error("削除に失敗");
//					fetchItem();
//				}catch(err){
//					console.error(err);
//				}
//			});
//		});

		setDeleteBtn(tableBody);
		
	}catch(error){
		console.error("取得データのhtmlへの挿入に失敗しました：" + error)
	}
}